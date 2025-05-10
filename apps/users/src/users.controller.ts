/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto, USERPATTERN, LoginUserDto, UserFilterDto } from '@shared/contracts/users';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';

@Controller()
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	@MessagePattern(USERPATTERN.CREATEUSER)
	create(@Payload() createUserDto: CreateUserDto) {
		return from(this.userService.create(createUserDto)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));
			
			})
		)
	}

	@MessagePattern(USERPATTERN.LOGINUSER)
	login(@Payload() loginUserDto: LoginUserDto) {
		return from(this.userService.login(loginUserDto)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}
	
	
	@MessagePattern(USERPATTERN.VERIFYUSER)
	verify(@Payload() { id, token }) {
		return from(this.userService.verify(id, token)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(USERPATTERN.RESENDUSER)
	resend(@Payload() { id }) {
		return from(this.userService.resendVerificationToken(id)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}
	
	@MessagePattern(USERPATTERN.FINDALLUSERS)
	findAll(@Payload() data: {limit: number, offset: number, search?: string, filter?: UserFilterDto}) {
		console.log({data})
		return from(this.userService.findAll(data.limit, data.offset, data.search, data.filter)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(USERPATTERN.FINDBYID)
	findOne(@Payload() id: string) {
		return from(this.userService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(USERPATTERN.UPDATE)
	update(@Payload() data: {id:string, updateUserDto: UpdateUserDto}) {
	  return this.userService.update(data.id, data.updateUserDto);
	}

	@MessagePattern('removeUser')
	remove(@Payload() id: number) {
		return from(this.userService.remove(id)).pipe(
			catchError((err) => {
				console.error("Error in UsersService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}
}
