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
		return this.userService.create(createUserDto);
	}

	@MessagePattern(USERPATTERN.FINDALLUSERS)
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return this.userService.findAll(limit, offset);
	}

	@MessagePattern(USERPATTERN.FINDUSERBYID)
	findOne(@Payload() id: string) {
		console.log('id', id)
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
