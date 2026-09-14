import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { BookMarkType, CreateUserDto, LoginUserDto, UpdateUserDto, UpdateUserPasswordDto, UserDto, UserFilterDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
// import { AdminRoleGuard } from '../jwt/admin.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../booking/booking.controller';
// import { CacheStore } from '../common/cache/cache.store';
import { JwtService } from '@nestjs/jwt';
import { CacheStore } from '../common/cache/cache.store';



@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService,
    ) { }
    private readonly LOGOUT_CACHE_KEY = "logged_out_jwt_tokens"
    
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
        const requestuser: UserDto = req.user
        const authorization = req.headers.authorization
        if (!authorization?.startsWith('Bearer ')) {
            throw new UnauthorizedException("Restricted area! you must login first");
        }
        const token = authorization.split(' ')[1];
        await this.invalidateToken(token)
        return this.usersService.logout(requestuser.id, );
    }


    @Post('refresh-login')
    refreshlogin(@Body() token: string) {
        this.isTokenBlacklisted(token)
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
        
        const requestuser: UserDto = req.user
        const {id, serviceType} = bookmark
        return this.usersService.bookmark(id, serviceType, requestuser.id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(@Query('limit') limit: number, @Query('offset') offset: number, @Query('search') search?: string, @Query('filter')  filter?: UserFilterDto) {
        console.log({filter})
        return this.usersService.findAll(limit, offset, search, filter);
    }

    @ApiOperation({ summary: 'Get the authenticated user' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() req: AuthenticatedRequest) {
        // JwtStrategy already resolves this from the users service on every
        // request, so it's current data, not stale JWT claims — no extra RPC needed.
        return req.user;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const requestuser: UserDto = req.user
        const authorization = req.headers.authorization
        if (!authorization?.startsWith('Bearer ')) {
            throw new UnauthorizedException("Restricted area! you must login first");
        }

        const token = authorization.split(' ')[1];
        await this.invalidateToken(token)
        const deletedBy = requestuser.id
        await this.usersService.remove({id, deletedBy});
        return "User account deleted successfully"
    }

    @Post('forgot-password')
    forgotPassword(@Body()  {email}) {
        return this.usersService.forgotPassword(email)
        
    }

    @Post('change-password')
    changePassword(@Body()  updateUserPasswordDto: UpdateUserPasswordDto) {
        return this.usersService.changePassword(updateUserPasswordDto)
        
    }


    async isTokenBlacklisted(token: string){
        const exists = await CacheStore.manager.get(`${this.LOGOUT_CACHE_KEY}_${token}`)
        if(exists){
            throw new UnauthorizedException("Restricted area! you must login first");
        }
    }


    async invalidateToken(token: string){
        const {exp} = await this.jwtService.decode(token)
        const ttl = (exp - Math.floor(Date.now() / 1000)) * 1000 ; // in milliseconds
        CacheStore.manager.set(`${this.LOGOUT_CACHE_KEY}_${token}`, true, ttl )
        return 
    }
}
