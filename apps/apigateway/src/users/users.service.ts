/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto, CreateUserDto, USERPATTERN, UserDto, LoginUserDto, UserFilterDto, UpdateUserPasswordDto, UniqueIdentifierDto, BookMarkType, } from '@shared/contracts/users';
import { USER_CLIENT } from '@shared/contracts';
import { firstValueFrom } from 'rxjs';
import { WALLETPATTERN } from '@shared/contracts/payments';
import { WalletService } from '../payment/payment.service';


@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
        private readonly walletService: WalletService
    ) { }

    create(createUserDto: CreateUserDto) {
        return this.userClient.send(USERPATTERN.CREATEUSER, createUserDto) 
    }

    async login(loginUserDto: LoginUserDto) {
        // return this.userClient.send<UserDto, CreateUserDto>({ cmd: USERPATTERN.CREATEUSER }, createUserDto)
        const {user, access_token, refresh_token} = await firstValueFrom(this.userClient.send<{ user: UserDto, refresh_token: string, access_token: string }, LoginUserDto>(USERPATTERN.LOGINUSER, loginUserDto))
        const userwallet = await firstValueFrom( this.walletService.findByUserId(user.id, user.userType));
        return{
            user: {
                ...user,
                wallet: userwallet
            },
            access_token,
            refresh_token
        }
    }

    refreshlogin(token: string) {
        return this.userClient.send<string>(USERPATTERN.REFRESHLOGIN, token)
    }


    logout(id: string) {
        console.log('Gateway sending logout message...');
        
        return this.userClient.send<string>(USERPATTERN.LOGOUT, id);
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

    bookmark(id: string, serviceType: BookMarkType, userId: string) {
        console.log({userId})
        return this.userClient.send<UserDto, { id: string, serviceType: BookMarkType, userId: string }>(USERPATTERN.BOOKMARK, {id, serviceType, userId})    
    }
    
    resend(id: string) {
        return this.userClient.send<UserDto, { id: string }>(USERPATTERN.RESENDUSER, { id })    
    }
    
    findAll(limit: number, offset: number, search?: string, filter?: UserFilterDto) {
        return this.userClient.send<UserDto[], { limit: number, offset: number, search?: string, filter?: UserFilterDto }>(USERPATTERN.FINDALLUSERS, { limit, offset, search, filter })
    }

    findManyByUnique(data: UniqueIdentifierDto[]) {
        return this.userClient.send<UserDto[], UniqueIdentifierDto[]>(USERPATTERN.FINDMANYBYUNIQUEIDENTIFIER, data)
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

    forgotPassword(email: string) {
		return this.userClient.send<UserDto, string>(USERPATTERN.RESETPASSWORD, email)

	}


	changePassword(updateUserPasswordDto: UpdateUserPasswordDto) {
		return this.userClient.send<UserDto, UpdateUserPasswordDto>(USERPATTERN.CHANGEPASSWORD, updateUserPasswordDto)
	}
}
