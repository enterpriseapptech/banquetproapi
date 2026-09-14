/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto, USERPATTERN, LoginUserDto, UserFilterDto, UpdateUserPasswordDto, UniqueIdentifierDto, BookMarkType } from '@shared/contracts/users';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Controller()
export class UsersController {
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService
	) { }

	@MessagePattern(USERPATTERN.CREATEUSER)
	create(@Payload() createUserDto: CreateUserDto) {
		return from(this.authService.create(createUserDto)).pipe(
			catchError((err) => {
				
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
		return from(this.authService.login(loginUserDto)).pipe(
			catchError((err) => {
				
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			}))

	}
	
	@MessagePattern(USERPATTERN.VERIFYUSER)
	verify(@Payload() { id, token }) {
		return from(this.authService.verify(id, token)).pipe(
			catchError((err) => {
				
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
		return from(this.authService.resendVerificationToken(id)).pipe(
			catchError((err) => {
				
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
		
		return from(this.userService.findAll(data.limit, data.offset, data.search, data.filter)).pipe(
			catchError((err) => {
				
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(USERPATTERN.FINDMANYBYUNIQUEIDENTIFIER)
	findManyByUnique(@Payload() data: UniqueIdentifierDto[]) {
		return from(this.userService.findManyByUnique(data)).pipe(
			catchError((err) => {
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

	@MessagePattern(USERPATTERN.DELETE)
	remove(@Payload() data:{ id: string, deletedBy: string}) {
		console.log("deleting user", {data})
		return from(this.userService.remove(data.id, data.deletedBy)).pipe(
			catchError((err) => {
				
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}
	
	
    @MessagePattern(USERPATTERN.RESETPASSWORD)
    forgotPassword(@Payload() email: string) {
        return from(this.authService.forgotPassword(email)).pipe(
            catchError((err) => {
                
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );
    }

    @MessagePattern(USERPATTERN.CHANGEPASSWORD)
    changePassword(@Payload() updateUserPasswordDto: UpdateUserPasswordDto) {
        return from(this.userService.changePassword(updateUserPasswordDto)).pipe(
            catchError((err) => {
                
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );
    }
	@EventPattern(USERPATTERN.BOOKMARK)
	bookmark(@Payload() data: {id: string, serviceType: BookMarkType, userId: string}) {
		const {id, serviceType, userId} = data
        return from(this.userService.bookmark(id, serviceType, userId)).pipe(
            catchError((err) => {
                
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );
    }
}
