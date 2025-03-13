/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '@prisma/users';
import { CreateUserDto, UpdateUserDto, UserDto, LoginUserDto } from '@shared/contracts/users';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATION_CLIENT } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // restrict admin account on creation pending approval
        const userStatus = createUserDto.userType === $Enums.UserType.ADMIN ? $Enums.UserStatus.RESTRICTED : $Enums.UserStatus.ACTIVE 
        
        const newUserInput: Prisma.UserCreateInput = {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: hashedPassword,
            userType: createUserDto.userType as $Enums.UserType,
            status: userStatus as $Enums.UserStatus
        }

        //  check if the provided email is a registered email
        const IsEmailNotUnique = await this.databaseService.user.findFirst({
            where: {
                email: newUserInput.email
            }
        });

        // if email is not unique and contains a value, throw error cos user exists already
        if (IsEmailNotUnique) {
            console.log("We have an existing user with this email, kindly login to your account")
            throw new ConflictException('This email has been used, kindly login to your account', {
                cause: new Error(),
                description: 'existing user'
            });

        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const account = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const user = await prisma.user.create({data: newUserInput});

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
                                serviceType: createUserDto.serviceType 
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

                // create personal access token for user account verification
                const hexCode = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
                const expiry = new Date();
                expiry.setHours(expiry.getHours() + 3);

                const personalaAccessTokens = await prisma.personalAccessTokens.create({
                    data: {
                        user: { connect: { id: user.id } },
                        token: hexCode,
                        type: 'VERIFYACCOUNT' as $Enums.TokenType,
                        expiry: expiry,
                    }
                });

                return { user, personalaAccessTokens }; // Return created user
            });

            //  emit a email verification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SENDNOTIFICATION, {
                type: 'EMAIL',
                recipientId: account.user.id,
                data: {
                    subject: 'Email Verification Notice!',
                    message: `Thank you for signing up! here is your verification code ${account.personalaAccessTokens.token}`,
                    recipientEmail: account.user.email,
                },
            });

            return account.user;
        } catch (error) {
            console.log(error)
            throw new ConflictException('sever error could not create user', {
                cause: new Error(),
                description: 'User account creation failed, please try again'
            });
        }


        
    }

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;

        const user = await this.databaseService.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new NotFoundException('we could not find a user with this email', {
                cause: new Error(),
                description: "we could not find a user with this email"
            });
        }

        if (user.status === $Enums.UserStatus.RESTRICTED || user.status === $Enums.UserStatus.DEACTIVATED) {
            throw new UnauthorizedException('Unauthorized error, user account is not restricted.');
        }

        const lastLoginTime = user.lastLoginAt ? new Date(user.lastLoginAt) : null;
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago

        if (user.loginAttempts >= 4 && lastLoginTime && lastLoginTime > tenMinutesAgo) {
            throw new UnauthorizedException('Too many failed login attempts. Please wait 10 minutes before trying again.');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            
            await this.databaseService.user.update({
                where: { email: email },
                data: {
                    loginAttempts: user.loginAttempts + 1,
                    lastLoginAt: new Date(),
                    status: user.loginAttempts + 1 > 7 ? $Enums.UserStatus.RESTRICTED : user.status
                }
            });

            if (user.loginAttempts + 1 > 7) {
                throw new UnauthorizedException('Authentication error',
                    {
                        cause: new Error(),
                        description: 'Your account has been disabled due to too many failed login attempts.'
                    }
                )
            }

            throw new UnauthorizedException('Authentication error, Incorrected password for this user',
                {
                    cause: new Error(),
                    description: "incorrect password"
                }
            )
        }

        const refreshToken = this.jwtService.sign({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: '7d',
        });

        // reset login attempts to 0 once successful login
        await this.databaseService.user.update({
            where: { email: email },
            data: {
                loginAttempts: 1,
                lastLoginAt: new Date(),
                refreshToken: refreshToken
             }
        });

        return {
            user: user,
            access_token: this.jwtService.sign({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: '59m', 
            }),
            refresh_token: refreshToken,
        };
        
    }
    
    async findAll(limit: number, offset: number): Promise<UserDto[]> {
        const users = this.databaseService.user.findMany({
            take: limit, // Number of records to retrieve
            skip: offset,
        })

        if (!users) {
            return [];
        }
        return users;
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
            serviceProvider: user.serviceProvider
                ? {
                    ...user.serviceProvider,
                    workingHours:
                        typeof user.serviceProvider.workingHours === 'string'
                            ? JSON.parse(user.serviceProvider.workingHours)
                            : user.serviceProvider.workingHours
                }
                : null
        };

        
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async verify(id: string, token: string) {
        const personalAccessToken = await this.databaseService.personalAccessTokens.findUnique({
            where: {
                userId_type: { userId: id, type: 'VERIFYACCOUNT' } , 
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
            console.log("user not found")
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
        this.notificationClient.emit(NOTIFICATIONPATTERN.SENDNOTIFICATION, {
            type: 'EMAIL',
            recipientId: user.id,
            data: {
                subject: 'Email Verification Notice!',
                message: `Thank you for signing up! here is your verification code ${personalAccessToken.token}`,
                recipientEmail: user.email,
            },
        });
        return user 
    }
}
