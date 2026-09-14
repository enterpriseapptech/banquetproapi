/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '../prisma/@prisma/users';
import { CreateUserDto, UpdateUserDto, UserDto, LoginUserDto, UserType, UserStatus, ServiceType, UserFilterDto, UpdateUserPasswordDto, UniqueIdentifierDto, BookMarkType, ServiceProviderDto } from '@shared/contracts/users';
import { NOTIFICATIONPATTERN, NotificationTemplateNames } from '@shared/contracts/shared';
import { WALLETPATTERN } from '@shared/contracts/shared';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATION_CLIENT } from './constants';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { PrismaErrorHandler } from '@shared/contracts/prisma.error.handler';
import { firstValueFrom } from 'rxjs';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';
import { PrismaClient } from '@prisma/client';

type PrismaClientOrTransaction =
  | PrismaClient
  | Prisma.TransactionClient;
@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    private readonly FRONTEND_URL = process.env.FRONTEND_URL;

    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        @Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService
    ) { }

    async refreshLogin(token: string): Promise<{ access_token: string; refresh_token: string }> {
        const user = await this.databaseService.user.findFirst({
            where: { refreshToken: token }
        });

        if (!user) {
            throw new UnauthorizedException('Refresh token is invalid or expired');
        }

        // Generate new tokens
        const refreshToken = this.jwtService.sign({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: '7d',
        });

        const accessToken = this.jwtService.sign({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: '59m',
        });

        // Store new refresh token
        await this.databaseService.user.update({
            where: { id: user.id },
            data: {
                refreshToken: refreshToken
            }
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async findAll(limit: number, offset: number, search?: string, filter?: UserFilterDto): Promise<{ count: number; docs: UserDto[] }> {
        
        const whereClause: any = {
            deletedAt: null,
            ...(filter?.userType && { userType: filter.userType }),
            ...(filter?.status && { status: filter.status }),
            ...(filter?.city && { city: filter.city }),
            ...(filter?.state && { state: filter.state }),
            ...(filter?.country && { country: filter.country }),
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { location: { contains: search, mode: 'insensitive' } },
                    { city: { contains: search, mode: 'insensitive' } },
                    { state: { contains: search, mode: 'insensitive' } },
                    { country: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };

        const [users, count] = await this.databaseService.$transaction([
            this.databaseService.user.findMany({
                where: whereClause,
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' },
            }),
            this.databaseService.user.count({ where: whereClause }),
        ]);

        return {
            count,
            docs: users.map(user => this.mapToUserDto(user)),
        };
    }

    async findManyByUnique(uniqueDetails: UniqueIdentifierDto[]): Promise<UserDto[]> {
        const users = await this.databaseService.user.findMany({
            where: {
                OR: uniqueDetails.map((u) => ({
                    id: u.id ?? undefined,
                    email: u.email ?? undefined,
                })),
            }
        });
        return { ...users.map(user => this.mapToUserDto(user)) };


    }

    async findOne(id: string): Promise<UserDto> {
        const user = await this.databaseService.user.findUnique({
            where: {
                id: id
            },
            include: {
                admin: true,
                serviceProvider: true,
                customer: true,
                staff: true,
                personalAccessToken: true
            }
        });
        if (!user) {
            throw new NotFoundException('sever error could not find this user', {
                cause: new Error(),
                description: 'no user found'
            });
        }

        return {
            ...user,
            refreshToken: undefined,
            password: undefined,
            status: user.status as unknown as UserStatus,
            userType: user.userType as unknown as UserType,
            serviceProvider: user.serviceProvider
                ? {
                    ...user.serviceProvider,
                    serviceType: user.serviceProvider.serviceType as unknown as ServiceType,
                    workingHours:
                        typeof user.serviceProvider.workingHours === 'string'
                            ? JSON.parse(user.serviceProvider.workingHours)
                            : user.serviceProvider.workingHours
                }
                : null
        };


    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const { ...userData } = updateUserDto;

        const account = await this.databaseService.$transaction(async (prisma) => {
            const user = await this.findUser(
                prisma,
                { id },
             )
            if (!user) {
                throw new NotFoundException('User not found');
            }
            const updateUserFields = {
                ...updateUserDto, 
                admin: undefined,
                serviceProvider: undefined,
                customer: undefined,
            }
            await this.updateUser(
                prisma, 
                { id },
                {...updateUserFields}
            )

            const userUpdated = await this.findUser(
                prisma,
                { id },
            )
            return userUpdated; // Return created user
        });

        return {
            ...account,
            status: account.status as unknown as UserStatus,
            userType: account.userType as unknown as UserType,
            
        }
    }

    async bookmark(id: string, serviceType: BookMarkType, userId: string) {
        const account = await this.databaseService.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new NotFoundException('User not found', {
                    cause: new Error(),
                    description: 'User not found'
                });
            }

            let updatedField: string[] = [];

            switch (serviceType) {
                case BookMarkType.catering:
                    updatedField = user.catering.includes(id)
                        ? user.catering.filter(item => item !== id) // remove
                        : [...user.catering, id]; // add
                    return await prisma.user.update({
                        where: { id: userId },
                        data: { catering: updatedField },
                    });
                    break;

                case BookMarkType.eventcenter:
                    updatedField = user.eventCenter.includes(id)
                        ? user.eventCenter.filter(item => item !== id)
                        : [...user.eventCenter, id];
                    return await prisma.user.update({
                        where: { id: userId },
                        data: { eventCenter: updatedField },
                    });
                    break;

                default:
                    throw new BadRequestException('Invalid service type', {
                        cause: new Error(),
                        description: 'User not found'
                    });
                  
            }
          
        });
        const userAccount: UserDto = {
                ...account,
                userType: account.userType as unknown as UserType,
                status: account.status as unknown as UserStatus,
            };
        return userAccount;
    } ;

    async remove(id: string, deletedBy: string) {
        const user = await this.databaseService.user.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy,
                    refreshToken: null
                },
        });
            //  const access_token  = await this.jwtService.decode({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
            //         secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            //         expiresIn: '59m',
            //     })
        console.log({user})
        return user; // Return created user

    }

    async verify(id: string, token: string) {
        const personalAccessToken = await this.databaseService.personalAccessTokens.findUnique({
            where: {
                userId_type: { userId: id, type: 'VERIFYACCOUNT' },
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
        const user = await this.databaseService.user.update({
            where: { id: personalAccessToken.userId },
            data: { isEmailVerified: true } // or true if it's a boolean field
        });

        return user;

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
            console.log({error})
            throw new Error(error);
        }
    }

    private async verifyPasswordToken(token: string, tokenId: string): Promise<{ isMatch: boolean, userId: string }> {
        try {
            const account = await this.databaseService.$transaction(async (prisma) => {

                const personalAccessToken = await prisma.personalAccessTokens.findUnique({
                    where: {
                        id: tokenId
                    },
                    select: { userId: true, token: true }
                });
                const isMatch = token === personalAccessToken.token

                return { isMatch, userId: personalAccessToken.userId }; // Return created user
            })

            return {
                isMatch: account.isMatch, userId: account.userId
            };

        } catch (error : any) {
            throw new Error(error);
        }
    }

    async changePassword(updateUserPasswordDto: UpdateUserPasswordDto): Promise<any> {
        try {

            if (!updateUserPasswordDto.oldPassword && !updateUserPasswordDto.token) {
                throw new UnauthorizedException('unauthorized request, no token or previous password provided', {
                    cause: new Error(),
                    description: 'unauthorized'
                });
            }

            let UserId: string
            if (updateUserPasswordDto.token) {
                const verifyToken = await this.verifyPasswordToken(updateUserPasswordDto.token, updateUserPasswordDto.id)
                if (!verifyToken.isMatch) throw new UnauthorizedException('Unauthorized request! Change password token mismatch');
                UserId = verifyToken.userId
            } else {

                const userPasword = await this.databaseService.user.findUnique({
                    where: { id: updateUserPasswordDto.userId },
                    select: { password: true, id: true }
                });

                const isMatch = await bcrypt.compare(updateUserPasswordDto.oldPassword, userPasword.password);
                if (!isMatch) throw new UnauthorizedException('Incorrect old password, could not update password');
                UserId = userPasword.id
            }

            const User = await this.databaseService.$transaction(async (prisma) => {
                const userPasword = await prisma.user.findUnique({
                    where: { id: UserId },
                    select: { password: true, id: true }
                });

                const passwordHistoryInput: Prisma.PasswordHistoryCreateInput = {
                    user: { connect: { id: userPasword.id } },
                    password: userPasword.password
                }

                const passwordHistory = await prisma.passwordHistory.create({ data: passwordHistoryInput })
                const hashedPassword = await bcrypt.hash(updateUserPasswordDto.password, 10);
                const user = await prisma.user.update({
                    where: { id: userPasword.id },
                    data: {
                        password: hashedPassword,

                    }
                });

                return user
            });
            const userAccount: UserDto = {
                ...User,
                userType: User.userType as unknown as UserType,
                status: User.status as unknown as UserStatus,
            };
            return userAccount;
        } catch (error : any) {
            throw new ConflictException(error);
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
            this.paymentClient.emit(WALLETPATTERN.CREATE, { userId});
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

    private async findUser(
        prisma: PrismaClientOrTransaction,
        where: Prisma.UserWhereInput,
        select?: Prisma.UserSelectScalar,
        include?: Prisma.UserInclude,
        ){
        const user = await prisma.user.findFirst({
                where,
                include,
                select,

        });

        return user
    }

    private async updateUser(
        prisma: PrismaClientOrTransaction,
        where: Prisma.UserWhereInput,
        userUpdateInpute: Prisma.UserUpdateInput,
        ): Promise<void>{
            
            await prisma.user.update({
                where,
                data: {...userUpdateInpute}
            });
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
