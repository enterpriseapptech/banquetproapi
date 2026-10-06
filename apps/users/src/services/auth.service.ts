/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
    ConflictException, 
    Inject, Injectable, 
    InternalServerErrorException, 
    Logger, 
    NotFoundException, 
    UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '../../prisma/@prisma/users';
import { CreateUserDto, UserDto, LoginUserDto, UserType, UserStatus,} from '@shared/contracts/users';
import { NOTIFICATIONPATTERN, NotificationTemplateNames } from '@shared/contracts/shared';
import { WALLETPATTERN } from '@shared/contracts/shared';
import { DatabaseService } from '../../database/database.service';
import { NOTIFICATION_CLIENT } from '.././constants';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { PrismaErrorHandler } from '@shared/contracts/prisma.error.handler';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';
import { CreateWalletDto } from '@shared/contracts/payments';
import { findUser, updateUser } from '../utils';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly FRONTEND_URL = process.env.FRONTEND_URL;

    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        @Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {

        //  check if the provided email is an already registered email
        const IsEmailNotUnique =  await findUser(
            this.databaseService,
            {email: createUserDto.email},
            {id: true}
        )

        // if email is not unique and contains a value, throw error cos user exists already
        if (IsEmailNotUnique) {

            throw new ConflictException('This email has been used, kindly login to your account', {
                cause: new Error(),
                description: 'existing user'
            });
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // restrict admin account on creation pending approval
        const userStatus = createUserDto.userType === $Enums.UserType.ADMIN 
                            ? $Enums.UserStatus.RESTRICTED 
                            : $Enums.UserStatus.ACTIVE

        const newUserInput: Prisma.UserCreateInput = {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: hashedPassword,
            userType: createUserDto.userType as $Enums.UserType,
            status: userStatus as $Enums.UserStatus
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const account = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const user = await prisma.user.create({ data: newUserInput });

                // Create the related entity based on user type
                switch (user.userType) {
                    case $Enums.UserType.ADMIN:
                        await prisma.admin.create({
                            data: {
                                id: user.id,
                            }
                        });
                        break;
                    case $Enums.UserType.SERVICE_PROVIDER:
                        await prisma.serviceProvider.create({
                            data: {
                                id: user.id,
                                businessName: createUserDto.businessName,
                            }
                        });
                        break;
                    case $Enums.UserType.CUSTOMER:
                        await prisma.customer.create({
                            data: {
                                id: user.id // Associate user with customer
                            }
                        });
                        break;
                    case $Enums.UserType.STAFF:
                        await prisma.staff.create({
                            data: {
                                id: user.id,
                                serviceProviderId: createUserDto.serviceProviderId // Associate user with staff
                            }
                        });
                        break;
                    default:
                        // If userType is unknown, rollback the transaction
                        throw new Error('Invalid user type');
                }

                const {hexCode, expiry}= this.generateVerificationCode()

                const personalaAccessTokens = await prisma.personalAccessTokens.create({
                    data: {
                        user: { connect: { id: user.id } },
                        token: hexCode,
                        type: $Enums.TokenType.VERIFYACCOUNT as $Enums.TokenType,
                        expiry: expiry,
                    }
                });

                return { user, personalaAccessTokens }; // Return created user
            });

            //  emit a email verification - notification event
            const recipientName= `${account.user.firstName} ${account.user.lastName}`
            this.emitEmailVerificationEvent(account.user.email, account.personalaAccessTokens.token, recipientName, )

            // emit wallet creation for CUSTOMER and SERVICE_PROVIDER accounts
            this.emitWalletCreateEvent(account.user.userType, account.user.id)
        
            const userAccount: UserDto = {
                ...account.user,
                userType: account.user.userType as unknown as UserType,
                status: account.user.status as unknown as UserStatus,
            };
            return userAccount;

        } catch (error : any) {
            PrismaErrorHandler.handle(error, Prisma);
            throw error
        }
    }

    async login(loginUserDto: LoginUserDto) {
        try {
            const { email, password } = loginUserDto;
            const user = await findUser(
                    this.databaseService,
                    {
                        email: email,
                        deletedAt: null
                    },
                    undefined,
                    {
                        admin: true,
                        serviceProvider: true,
                        staff: true,
                        customer: true
                    }
                )
            
            if (!user) {
                throw new NotFoundException('Invalid credentials, email or password incorrect', {
                    cause: new Error(),
                    description: "we could not find a user with this email"
                });
            }

            if (user.status === $Enums.UserStatus.RESTRICTED || user.status === $Enums.UserStatus.DEACTIVATED) {
                throw new UnauthorizedException('Unauthorized error, user account is restricted.');
            }
            const max_failed_login_attempts = Number(process.env.MAX_FAILED_LOGIN_ATTEMPTS)
            const lastLoginTime = user.lastLoginAt ? new Date(user.lastLoginAt) : new Date();
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago
            const restrict_login= user.loginAttempts >= max_failed_login_attempts && lastLoginTime > tenMinutesAgo
            if (restrict_login) {
                throw new UnauthorizedException('Too many failed login attempts. Please wait 10 minutes before trying again.');
            }

            const validatePassword = await bcrypt.compare(password, user.password);

            if (!validatePassword) {
                await this.logFailedLogin(user.loginAttempts, user.status, user.email)
            }

            // Ensure wallet exists for customer/SP accounts (handles pre-existing users)
            this.emitWalletCreateEvent(user.userType, user.id)
            
            return {...user, refreshToken: undefined, password: undefined};
            
        } catch (error: any) {
            PrismaErrorHandler.handle(error, Prisma);
           throw error
        }
    }

    async verify(id: string, token: string) {
        try {
            
       
            const personalAccessToken = await this.databaseService.personalAccessTokens.findUnique({
                where: {
                    userId_type: { userId: id, type: $Enums.TokenType.VERIFYACCOUNT },
                    token: token
                }
            });

            if (!personalAccessToken) {
                throw new NotFoundException('Invalid verification token', {
                    cause: new Error(),
                    description: 'invalid token, could not verify account'
                });
            }

            // Check if the token has expired
            const now = new Date();
            if (personalAccessToken.expiry && new Date(personalAccessToken.expiry) < now) {
                throw new UnauthorizedException('Your verification token has expired', {
                    cause: new Error(),
                    description: 'Your verification token has expired'
                });
            }

            // Update user to set email as verified
            const user = await updateUser(
                this.databaseService,
                { id: personalAccessToken.userId },
                { isEmailVerified: true }
            )
            
            return user;
        } catch (error) {
            PrismaErrorHandler.handle(error, Prisma);
            throw error;
        }
    }

    async resendVerificationToken(id: string) {
        const user = await this.databaseService.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {

            throw new NotFoundException('This user does not exist in our system', {
                cause: new Error(),
                description: 'could not find a valid user'
            });
        }

        // create personal access token for user account verification
        const hexCode = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 3);

        const personalAccessTokenInput: Prisma.PersonalAccessTokensCreateInput = {
            user: { connect: { id: user.id } },
            token: hexCode,
            type: 'VERIFYACCOUNT' as $Enums.TokenType,
            expiry: expiry,
        }

        const personalAccessToken = await this.databaseService.personalAccessTokens.upsert({
            where: { userId_type: { userId: user.id, type: 'VERIFYACCOUNT' } },
            update: {
                token: personalAccessTokenInput.token,
                expiry: personalAccessTokenInput.expiry,
            },
            create: {
                user: { connect: { id: user.id } },
                token: personalAccessTokenInput.token,
                type: 'VERIFYACCOUNT' as $Enums.TokenType,
                expiry: personalAccessTokenInput.expiry,
            },
        });

        if (!personalAccessToken) {
            throw new InternalServerErrorException('Could not generate a verification code', {
                cause: new Error(),
                description: 'server error, could not generate verification code'
            });

            // should log error to logger later on when logger is available
        }

        //  emit a email verification - notification event
         //  emit a email verification - notification event
            this.notificationClient.emit<string, NotificationInterface>(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                data: {
                    subject: 'Email Verification Notice!',
                    message: `Thank you for signing up! here is your verification code ${personalAccessToken.token}`,
                    recipientEmail: user.email,
                    recipientName: `${user.firstName} ${user.lastName}`,
                    templateName: NotificationTemplateNames.VERIFICATION,
                    templateVariables: { verificationCode: personalAccessToken.token },
                },
            });
        return user
    }

    async forgotPassword(email: string): Promise<string> {
        try {
            // Start a transaction - for an all or fail process of creating a user
            const account = await this.databaseService.$transaction(async (prisma) => {
                const user = await this.databaseService.user.findUnique({
                    where: {
                        email
                    }
                });

                if (!user) {
                    throw new NotFoundException('We could not find an account associated with this email', {
                        cause: new Error(),
                        description: 'No existing user'
                    });

                }

                // create personal access token for user account verification
                const hexCode = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
                const expiry = new Date();
                expiry.setHours(expiry.getHours() + 3);
                const hashedHexCode = await bcrypt.hash(hexCode, 10);
                const personalAccessToken = await prisma.personalAccessTokens.upsert({
                    where: {
                        userId_type: {
                            userId: user.id,
                            type: 'PASSWORDRESET' as $Enums.TokenType
                        }
                    },
                    update: {
                        token: hashedHexCode,
                        expiry: expiry
                    },
                    create: {
                        user: { connect: { id: user.id } },
                        token: hashedHexCode,
                        type: 'PASSWORDRESET' as $Enums.TokenType,
                        expiry: expiry
                    }
                });
                return { user, hashedHexCode, personalAccessToken }; // Return created user
            }, {
            timeout: 15000, // 20 seconds
            maxWait: 10000, // optional: wait longer for a connection
        });

            //  emit a email verification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, 
                {
                type: 'EMAIL',
                data: {
                    subject: 'Email Verification Notice!',
                    message: `You recently requested to change your password. click the link ${process.env.FRONTEND_URL}/resetpassword?resettoken=${account.hashedHexCode}&tokendata=${account.personalAccessToken.id}`,
                    recipientEmail: account.user.email,
                    recipientName: `${account.user.firstName} ${account.user.lastName}`,
                    templateName: NotificationTemplateNames.FORGOT_PASSWORD,
                    templateVariables: { subject: 'Request to reset your password', 
                        link: `${process.env.FRONTEND_URL || this.FRONTEND_URL}/resetpassword?resettoken=${account.hashedHexCode}&tokendata=${account.personalAccessToken.id}` },
                },
            });

            return "We sent you an email containing details to reset your password";

        } catch (error : any) {
            PrismaErrorHandler.handle(error, Prisma);
            throw error;
        }
    }

    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToUserDto(user: any): UserDto {
        return {
            ...user,
            password: undefined,
            refreshToken: undefined,
            userType: user.userType as unknown as UserType,
            status: user.status as unknown as UserStatus,
        };
    }

    private emitWalletCreateEvent (userType: $Enums.UserType, userId): void{
        if (userType === $Enums.UserType.CUSTOMER || $Enums.UserType.SERVICE_PROVIDER) {
            this.paymentClient.emit<CreateWalletDto>(WALLETPATTERN.CREATE, { userId, userType});
            this.logger.log(`Wallet create event emitted | userId=${userId} type=${userType}`);
        }
    }

    private generateVerificationCode(): {hexCode: string, expiry: Date}{
        // create personal access token for user account verification
        const hexCode = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
        console.log(`email verification code ${hexCode}`)
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + Number(process.env.VERIFICATION_CODE_EXPIRY));
        return {hexCode, expiry}
    }

    private async logFailedLogin (loginAttempts: number, userStatus: $Enums.UserStatus, email: string){
        const max_failed_login_attempts = Number(process.env.MAX_FAILED_LOGIN_ATTEMPTS)
        const isMaxLoginReached = loginAttempts + 1 > max_failed_login_attempts 
        const status = isMaxLoginReached
                        ? $Enums.UserStatus.RESTRICTED 
                        : userStatus
        await this.databaseService.user.update({
            where: { email},
            data: {
                loginAttempts: loginAttempts + 1,
                lastLoginAt: new Date(),
                status
            }
        });

        if (isMaxLoginReached) {
            throw new UnauthorizedException('Authentication error',
                {
                    cause: new Error(),
                    description: 'Your account has been disabled due to too many failed login attempts.'
                }
            )
        }

        throw new UnauthorizedException('Authentication error, Incorrected password or email for this user',
            {
                cause: new Error(),
                description: "incorrect password or email"
            }
        )
            
    }

    private emitEmailVerificationEvent(email: string, token: string, recipientName: string){
        this.notificationClient.emit<string, NotificationInterface>(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                data: {
                    subject: 'Email Verification Notice!',
                    message: `Thank you for signing up! here is your verification code ${token}`,
                    recipientEmail: email,
                    recipientName,
                    templateName: NotificationTemplateNames.VERIFICATION,
                    templateVariables: { verificationCode: token },
                },
            });
    }
}
