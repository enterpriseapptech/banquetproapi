/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto, CreateUserDto, USERPATTERN, UserDto, LoginUserDto, UserFilterDto, } from '@shared/contracts/users';
import { USER_CLIENT } from '@shared/contracts';


@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_CLIENT) private readonly userClient: ClientProxy
    ) { }

    create(createUserDto: CreateUserDto) {
        console.log('Gateway sending login message...');
        return this.userClient.send(USERPATTERN.CREATEUSER, createUserDto) 
    }

    login(loginUserDto: LoginUserDto) {
        // return this.userClient.send<UserDto, CreateUserDto>({ cmd: USERPATTERN.CREATEUSER }, createUserDto)
        console.log('Gateway sending login message...');
        return this.userClient.send<{ user: UserDto, refresh_token: string, access_token: string }, LoginUserDto>(USERPATTERN.LOGINUSER, loginUserDto)
        // .subscribe({
        //   next: (response) => console.log('Response received:', response),
        //   error: (err) => console.error('Error:', err),
        // });

    }

    verify(id: string, token: string) {
        try {
            return this.userClient.send<UserDto, { id: string, token: string }>(USERPATTERN.VERIFYUSER, { id, token })
        } catch (e) {
            throw new UnauthorizedException('access token is invalid', {
                cause: new Error(),
                description: 'access token is invalid',
            });
        }
    }

    
    resend(id: string) {
        return this.userClient.send<UserDto, { id: string }>(USERPATTERN.RESENDUSER, { id })    
    }
    
    findAll(limit: number, offset: number, search?: string, filter?: UserFilterDto) {
        return this.userClient.send<UserDto[], { limit: number, offset: number, search?: string, filter?: UserFilterDto }>(USERPATTERN.FINDALLUSERS, { limit, offset, search, filter })
    }

    findOne(id: string) {
        return this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, id)
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userClient.send<UserDto, {id: string, updateUserDto: UpdateUserDto}>(USERPATTERN.UPDATE, {id, updateUserDto})
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
