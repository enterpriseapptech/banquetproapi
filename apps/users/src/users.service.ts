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
import { findUser, updateUser } from './utils';

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
        const user = await findUser(
            this.databaseService,
            {id},
            undefined,
            {
                admin: true,
                serviceProvider: true,
                customer: true,
                staff: true,
                personalAccessToken: true
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
            const user = await findUser(
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
            await updateUser(
                prisma, 
                { id },
                {...updateUserFields}
            )

            const userUpdated = await findUser(
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
            const user = await findUser(
                prisma,
                { id: userId }
            );

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

                case BookMarkType.eventcenter:
                    updatedField = user.eventCenter.includes(id)
                        ? user.eventCenter.filter(item => item !== id)
                        : [...user.eventCenter, id];
                    return await prisma.user.update({
                        where: { id: userId },
                        data: { eventCenter: updatedField },
                    });

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
                    deletedBy
                },
        });
            //  const access_token  = await this.jwtService.decode({ sub: user.id, type: user.userType, isEmailVerified: user.isEmailVerified }, {
            //         secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            //         expiresIn: '59m',
            //     })
        console.log({user})
        return user; // Return created user

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

  

}
