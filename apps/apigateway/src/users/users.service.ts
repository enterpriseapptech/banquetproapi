/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto, CreateUserDto, USERPATTERN, UserDto } from '@shared/contracts';
import { USER_CLIENT } from './constants';


@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_CLIENT) private readonly userClient: ClientProxy
  ) { }

  create(createUserDto: CreateUserDto) {
    // return this.userClient.send<UserDto, CreateUserDto>({ cmd: USERPATTERN.CREATEUSER }, createUserDto)
    console.log('Gateway sending message...');
    return  this.userClient.send<UserDto, CreateUserDto>(USERPATTERN.CREATEUSER, createUserDto)
      // .subscribe({
      //   next: (response) => console.log('Response received:', response),
      //   error: (err) => console.error('Error:', err),
      // });

  }

  findAll() {
    return `This action returns all users`;
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
