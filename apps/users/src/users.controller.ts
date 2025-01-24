/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto, USERPATTERN } from '@shared/contracts';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @MessagePattern(USERPATTERN.CREATEUSER)
  create(@Payload() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto)
    console.log('Message received in microservice:', createUserDto);
    return this.userService.create(createUserDto);
  }

  @MessagePattern(USERPATTERN.FINDALLUSERS)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  // @MessagePattern('updateUser')
  // update(@Payload() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto.id, updateUserDto);
  // }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
