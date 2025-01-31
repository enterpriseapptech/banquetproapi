/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '@prisma/client';
import { CreateUserDto, NOTIFICATIONPATTERN, UpdateUserDto, UserDto, LoginUserDto } from '@shared/contracts';
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

                const personalAccessTokenInput: Prisma.PersonalAccessTokensCreateInput = {
                    token: hexCode,
                    type: 'VERIFYACCOUNT' as $Enums.TokenType,
                    expiry: expiry,
                }

                const personalaAccessTokens = await prisma.personalAccessTokens.create({ data: personalAccessTokenInput });

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

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new UnauthorizedException('Authentication error, Incorrected password for this user',
                {
                    cause: new Error(),
                    description: "incorrect password"
                }
            )
        }
        return {
            user: user,
            access_token: this.jwtService.sign({ sub: user.id, type: user.userType}, {
                expiresIn: '59m', 
            }),
            refresh_token: this.jwtService.sign({ sub: user.id, type: user.userType }, {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                expiresIn: '7d',
            }),
        };
        
    }
    
    async findAll(limit: number, offset: number): Promise<UserDto[]> {
        const users = this.databaseService.user.findMany({
            take: limit, // Number of records to retrieve
            skip: offset,
        })
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
                staff: true
            }
        });
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async verify(id: string, token: string) {
        // check personal access token for token
        const personalAccessToken = await this.databaseService.personalAccessTokens.findUnique({
            where: {
                id: id,
                token: token
            }
        });

        // If token does not exist or does not match, return null
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
            where: { id: personalAccessToken.id },
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
            token: hexCode,
            type: 'VERIFYACCOUNT' as $Enums.TokenType,
            expiry: expiry,
        }

        const personalAccessToken = await this.databaseService.personalAccessTokens.upsert({
            where: { id: user.id }, // Use the unique identifier (e.g., ID)
            update: {
                token: personalAccessTokenInput.token,
                expiry: personalAccessTokenInput.expiry,
            },
            create: {
                id: user.id,
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

    }
}
