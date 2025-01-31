/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto, USERPATTERN, LoginUserDto } from '@shared/contracts';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { AdminRoleGuard } from '../jwt/admin.guard';

@Controller()
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	@MessagePattern(USERPATTERN.CREATEUSER)
	create(@Payload() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@MessagePattern(USERPATTERN.LOGINUSER)
	login(@Payload() loginUserDto: LoginUserDto) {
		return this.userService.login(loginUserDto);
	}
	
	@UseGuards(JwtAuthGuard)
	@MessagePattern(USERPATTERN.VERIFYUSER)
	verify(@Payload() loginUserDto: LoginUserDto) {
		return this.userService.login(loginUserDto);
	}
	
	@UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
	@MessagePattern(USERPATTERN.FINDALLUSERS)
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return this.userService.findAll(limit, offset);
	}

	@MessagePattern(USERPATTERN.FINDUSERBYID)
	findOne(@Payload() id: string) {
		console.log('id', id)
		return this.userService.findOne(id);
	}

	@UseGuards(JwtAuthGuard, VerificationGuard)
	@MessagePattern(USERPATTERN.FINDALLUSERS)
	findSome(@Payload() limit: number, @Payload() offset: number) {
		return this.userService.findAll(limit, offset);
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
