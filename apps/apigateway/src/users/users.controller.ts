import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserFilterDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { AdminRoleGuard } from '../jwt/admin.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


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

    @UseGuards(JwtAuthGuard)
    @Post('verify')
    verify(@Body() { id, token }) {
        const verify = this.usersService.verify(id, token)
        console.log("verification", verify)
        return verify;
    }

    @UseGuards(JwtAuthGuard)
    @Post('resend-verification')
    resend(@Body() { id}) {
        return this.usersService.resend(id)
        
    }

    // @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Get()
    findAll(@Query('limit') limit: number, @Query('offset') offset: number, @Query('search') search?: string, @Query('filter')  filter?: UserFilterDto) {
        console.log({limit})
        return this.usersService.findAll(limit, offset, search, filter);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log("pr trigger")
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
}
