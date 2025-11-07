import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { BookMarkType, CreateUserDto, LoginUserDto, UpdateUserDto, UpdateUserPasswordDto, UserDto, UserFilterDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
// import { AdminRoleGuard } from '../jwt/admin.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../booking/booking.controller';
import { firstValueFrom } from 'rxjs';



@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @ApiOperation({ summary: 'Create User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.login(loginUserDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('logout')
    async logout(@Req() req: AuthenticatedRequest) {
        const requestuser: UserDto = await firstValueFrom(req.user)
        return this.usersService.logout(requestuser.id, );
    }


    @Post('refresh-login')
    refreshlogin(@Body() token: string) {
        return this.usersService.refreshlogin(token);
    }


    @Post('verify')
    verify(@Body() { id, token }) {
        const verify = this.usersService.verify(id, token)
        console.log("verification", verify)
        return verify;
    }

    @Post('resend-verification')
    resend(@Body() { id}) {
        return this.usersService.resend(id)    
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('bookmark')
    async bookmark(@Body() bookmark: { id: string, serviceType: BookMarkType}, @Req() req: AuthenticatedRequest) {
        
        const requestuser: UserDto = await firstValueFrom(req.user)
        const {id, serviceType} = bookmark
        return this.usersService.bookmark(id, serviceType, requestuser.id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(@Query('limit') limit: number, @Query('offset') offset: number, @Query('search') search?: string, @Query('filter')  filter?: UserFilterDto) {
        console.log({filter})
        return this.usersService.findAll(limit, offset, search, filter);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Post('forgot-password')
    forgotPassword(@Body()  {email}) {
        return this.usersService.forgotPassword(email)
        
    }

    @Post('change-password')
    changePassword(@Body()  updateUserPasswordDto: UpdateUserPasswordDto) {
        return this.usersService.changePassword(updateUserPasswordDto)
        
    }
}
