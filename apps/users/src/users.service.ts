/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserDto } from '@shared/contracts';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) { }


    // Promise<Prisma.UserDto>
    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const newUser: Prisma.UserCreateInput = {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: await bcrypt.hash(createUserDto.password, 10),
            userType: createUserDto.userType as $Enums.UserType,
            status: 'ACTIVE' as $Enums.UserStatus
        }

        //  check if the provided email is a registered email
        const IsEmailNotUnique = await this.databaseService.user.findFirst({
            where: {
                email: newUser.email
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

        // create new user if email does not exist
        const createUser = await this.databaseService.user.create({ data: newUser })

        //  if an error occurs during creation of new user, throw exeception
        if (!createUser) {

            console.log("could not create user")
            throw new InternalServerErrorException('sever error could not create user', {
                cause: new Error(),
                description: 'could not create user'
            });
        }
        return createUser;
    }

    findAll(limit: number, offset: number): Promise<UserDto[]> {
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
            }
        });
        console.log('user here', user)
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
