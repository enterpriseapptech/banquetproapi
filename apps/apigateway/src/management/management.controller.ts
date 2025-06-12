import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UnauthorizedException } from '@nestjs/common';
import { CountryService,  StateService } from './management.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCountryDto, CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { AdminRoleGuard } from '../jwt/admin.guard';
import { UpdateCountryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@shared/contracts/users';


interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}

@ApiTags('admin')
@Controller('admin/country')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @ApiOperation({ summary: 'Create Country' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Post()
    async create(@Body() createCountryDto: CreateCountryDto, @Req() req: AuthenticatedRequest) {
        const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        createCountryDto.updatedBy = user.id
        return this.countryService.create(createCountryDto);
    }

    @ApiOperation({ summary: 'Get all Country' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('deletedAt') deletedAt?: boolean,
        @Query('search') search?: string,
    ) {

        return this.countryService.findAll(limit, offset, deletedAt, search)
       
    }

    @ApiOperation({ summary: 'Get One Country by Id' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.countryService.findOne(id);
    }

    @ApiOperation({ summary: 'Update Country' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        updateCountryDto.updatedBy = user.id
        return this.countryService.update(id, updateCountryDto);

    }

    @ApiOperation({ summary: 'Soft Delete Country' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.countryService.remove(id, user.id);
    }


    @ApiOperation({ summary: 'Permanent Delete Country' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async permanentDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.countryService.permanentDelete(id, user.id);
    }

}

@Controller('admin/state')
export class StateController {
    constructor(private readonly stateService: StateService) { }

    @ApiOperation({ summary: 'Create state' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Post()
    create(@Body() createStateDto: CreateStateDto) {
        return this.stateService.create(createStateDto);
    }

    @ApiOperation({ summary: 'Get all state' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('deletedAt') deletedAt?: boolean,
        @Query('search') search?: string,
    ) {

        return this.stateService.findAll(limit, offset, deletedAt, search)
       
    }

    @ApiOperation({ summary: 'Get One state by Id' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.stateService.findOne(id);
    }

    @ApiOperation({ summary: 'Update state' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
        return this.stateService.update(id, updateStateDto);

    }

    @ApiOperation({ summary: 'Soft Delete state' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.stateService.remove(id, user.id);
    }


    @ApiOperation({ summary: 'Permanent Delete state' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async permanentDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.stateService.permanentDelete(id, user.id);
    }

}

