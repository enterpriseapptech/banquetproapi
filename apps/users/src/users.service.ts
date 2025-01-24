/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from '@shared/contracts';
@Injectable()
export class UsersService {
  // Promise<Prisma.UserCreateInput>
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const newUser: Prisma.UserCreateInput = {
      firstname: createUserDto.firstName,
      lastname: createUserDto.lastName,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      userType: createUserDto.userType,
      status: 'ACTIVE'
    }

    // // create new user if email does not exist
    // const createUser = await this.databaseService.user.create({ data: newUser })

    // // //  if an error occurs during creation of new user, throw exceoption
    // if (!createUser) {

    //   console.log("could not create user")
    //   throw new InternalServerErrorException('sever error could not create user', {
    //     cause: new Error(),
    //     description: 'user not found'
    //   });
    // }
    // return createUser;
    return createUserDto;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
