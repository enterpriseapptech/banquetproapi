/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '../prisma/@prisma/users';
import { CreateUserDto, UpdateUserDto, UserDto, LoginUserDto, UserType, UserStatus, ServiceType, UserFilterDto, UpdateUserPasswordDto } from '@shared/contracts/users';
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
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                recipientId: account.user.id,
                data: {
                    subject: 'Email Verification Notice!',
                    message: `Thank you for signing up! here is your verification code ${account.personalaAccessTokens.token}`,
                    recipientEmail: account.user.email,
                },
            });
            
            const userAccount: UserDto = {
                ...account.user ,
                userType: account.user.userType as unknown as UserType,
                status: account.user.status as unknown as UserStatus,
            };
            return userAccount;

        } catch (error) {
           
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
            },
            include: {
                admin: true,
                serviceProvider: true,
                staff: true,
                customer: true
            }
        });

        if (!user) {
            throw new NotFoundException('we could not find a user with this email', {
                cause: new Error(),
                description: "we could not find a user with this email"
            });
        }

        // if (!user.isEmailVerified) {
        //     throw new UnauthorizedException('Verification error!, kindly verifify your email before logging in.');
        // }


        if (user.status === $Enums.UserStatus.RESTRICTED || user.status === $Enums.UserStatus.DEACTIVATED) {
            throw new UnauthorizedException('Unauthorized error, user account is restricted.');
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
            user: {...user, refreshToken:undefined, password: undefined,},
            access_token: this.jwtService.sign({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: '59m', 
            }),
            refresh_token: refreshToken,
        };
        
    }

    async logout(userId: string): Promise<boolean> {
        await this.databaseService.user.update({
            where: { id: userId },
            data: {
            refreshToken: null
            },
        });

        return true;
    }

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
        console.log({UserType})
        const whereClause:any = {
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


    async findOne(id: string): Promise<UserDto> {
        console.log("finding 1")
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
                    serviceType: user.serviceProvider.serviceType as  unknown as ServiceType,
                    workingHours:
                        typeof user.serviceProvider.workingHours === 'string'
                            ? JSON.parse(user.serviceProvider.workingHours)
                            : user.serviceProvider.workingHours
                }
                : null
        };

        
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const {...userData } = updateUserDto;

        const account = await this.databaseService.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id },
                include: {
                admin: true,
                serviceProvider: true,
                },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            const userUpdated =  prisma.user.update({
                where: { id },
                data: userData,
                })


            return userUpdated; // Return created user
        });
       
    	return  {
            ...account,
            status: account.status as unknown as UserStatus,
            userType: account.userType as unknown as UserType,
            // serviceProvider: account.serviceProvider
            //     ? {
            //         ...account.serviceProvider,
            //         serviceType: account.serviceProvider.serviceType as  unknown as ServiceType,
            //         workingHours:
            //             typeof user.serviceProvider.workingHours === 'string'
            //                 ? JSON.parse(user.serviceProvider.workingHours)
            //                 : user.serviceProvider.workingHours
            //     }
            //     : null
        };
        // // Update Admin model if data exists
        // if (admin && user.admin) {
        //     updateOperations.push(
        //     this.databaseService.admin.update({
        //         where: { id },
        //         data: admin,
        //     })
        //     );
        // }

        // Update or create ServiceProvider
        // if (serviceProvider) {
        //     if (user.serviceProvider) {
        //     updateOperations.push(
        //         this.databaseService.serviceProvider.update({
        //         where: { id },
        //         data: serviceProvider,
        //         })
        //     );
        //     } else {
        //     updateOperations.push(
        //         this.databaseService.serviceProvider.create({
        //         data: {
        //             id, // same as userId
        //             ...serviceProvider,
        //         },
        //         })
        //     );
        //     }
        // }

        // Run all updates concurrently
        // return await this.databaseService.$transaction(updateOperations);

        // return { message: 'User updated successfully' };
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
        this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
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
            });

            //  emit a email verification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                recipientId: account.user.id,
                data: {
                    subject: 'Request to reset your password',
                    message: `You recently requested to change your password. click the link ${process.env.FRONTEND_URL}/resetpassword?resettoken=${account.hashedHexCode}&tokendata=${account.personalAccessToken.id}`,
                    recipientEmail: account.user.email,
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px;">
                        <h2 style="color: #2d2d2d;">Forgot Your Password?</h2>
                        <p style="font-size: 16px; color: #555;">
                            Hello, <br/><br/>
                            We received a request to reset your password. click on the button below to proceed:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.FRONTEND_URL}/resetpassword?resettoken=${account.hashedHexCode}&tokendata=${account.personalAccessToken.id}" style="display: inline-block; font-size: 28px; letter-spacing: 4px; background-color: #fff; padding: 12px 20px; border-radius: 6px; border: 1px solid #ddd; font-weight: bold;">
                            Change Password
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #777;">
                            This code will expire in 15 minutes. If you didn’t request this, you can safely ignore this email.
                        </p>
                        <p style="margin-top: 40px; font-size: 13px; color: #aaa;">
                            — Banquet Pro Team
                        </p>
                        </div>`
                    
                },
            });

            return "We sent you an email containing details to reset your password";

        } catch (error) {
            throw new Error(error);
        }



    }

    private async verifyPasswordToken(token: string, tokenId: string): Promise<{isMatch: boolean, userId: string}> {
        try {
            const account = await this.databaseService.$transaction(async (prisma) => {
                
                const personalAccessToken = await prisma.personalAccessTokens.findUnique({
                    where: {
                        id: tokenId
                    },
                    select: {userId: true, token: true}
                });
                const isMatch = token === personalAccessToken.token

                return { isMatch, userId: personalAccessToken.userId }; // Return created user
            })

            return { isMatch: account.isMatch, userId: account.userId 
          };

        } catch (error) {
            throw new Error(error);
        }
    }

    async changePassword(updateUserPasswordDto: UpdateUserPasswordDto): Promise<any> {
        try {
            
            if (!updateUserPasswordDto.oldPassword && !updateUserPasswordDto.token ) {
                throw new UnauthorizedException('unauthorized request, no token or previous password provided', {
                    cause: new Error(),
                    description: 'unauthorized'
                });
            }

            let UserId: string
            if (updateUserPasswordDto.token) {
                const verifyToken = await this.verifyPasswordToken(updateUserPasswordDto.token, updateUserPasswordDto.id )
                if (!verifyToken.isMatch) throw new UnauthorizedException('Unauthorized request! Change password token mismatch');
                UserId = verifyToken.userId
            } else {

                const userPasword = await this.databaseService.user.findUnique({
                    where: { id: updateUserPasswordDto.userId },
                    select: { password: true, id: true }
                });

                const isMatch = await bcrypt.compare(updateUserPasswordDto.oldPassword, userPasword.password);
                if (!isMatch) throw new UnauthorizedException('Incorrect old password, could not update password');
                UserId =userPasword.id
            }

            const User = await this.databaseService.$transaction(async (prisma) => {
                const userPasword = await prisma.user.findUnique({
                    where: { id: UserId },
                    select:{password:true, id: true}
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
        } catch (error) {
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
}
