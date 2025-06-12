import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UnauthorizedException } from '@nestjs/common';
import { CityService, CountryService, ServiceCategoryService, ServiceService, ServiceSubCategoryService, StateService } from './management.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCityDto, CreateCountryDto, CreateServiceCategoryDto, CreateServiceDto, CreateServiceSubCategoryDto, CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { AdminRoleGuard } from '../jwt/admin.guard';
import { UpdateCityDto, UpdateCountryDto, UpdateServiceCategoryDto, UpdateServiceDto, UpdateServiceSubCategoryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@shared/contracts/users';


interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}

@Controller('admin/serviceCategory')
export class ServiceCategoryController {
    constructor(private readonly serviceCategoryService: ServiceCategoryService) { }

    @ApiOperation({ summary: 'Create Country' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Post()
    create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
        return this.serviceCategoryService.create(createServiceCategoryDto);
    }

    @ApiOperation({ summary: 'Get all User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Get()
    findAll(@Param('limit') limit: number, @Param('offset') offset: number) {
        return this.serviceCategoryService.findAll(limit, offset);
    }

    @ApiOperation({ summary: 'Get One User by Id' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.serviceCategoryService.findOne(id);
    }

    @ApiOperation({ summary: 'Update User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServiceCategoryDto: UpdateServiceCategoryDto) {
        return this.serviceCategoryService.update(id, updateServiceCategoryDto);

    }

    @ApiOperation({ summary: 'Soft Delete User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.serviceCategoryService.remove(id, user.id);
    }


    @ApiOperation({ summary: 'Permanent Delete User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Delete(':id')
    async permanentDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.serviceCategoryService.permanentDelete(id, user.id);
    }

}


@Controller('admin/serviceSubCategory')
export class ServiceSubCategoryController {
    constructor(private readonly serviceSubCategoryService: ServiceSubCategoryService) { }

    @ApiOperation({ summary: 'Create serviceSubCategory' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Post()
    create(@Body() createServiceSubCategoryDto: CreateServiceSubCategoryDto) {
        return this.serviceSubCategoryService.create(createServiceSubCategoryDto);
    }

    @ApiOperation({ summary: 'Get all User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Get()
    findAll(@Param('limit') limit: number, @Param('offset') offset: number) {
        return this.serviceSubCategoryService.findAll(limit, offset);
    }

    @ApiOperation({ summary: 'Get One User by Id' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.serviceSubCategoryService.findOne(id);
    }

    @ApiOperation({ summary: 'Update User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServiceSubCategoryDto: UpdateServiceSubCategoryDto) {
        return this.serviceSubCategoryService.update(id, updateServiceSubCategoryDto);

    }

    @ApiOperation({ summary: 'Soft Delete User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.serviceSubCategoryService.remove(id, user.id);
    }


    @ApiOperation({ summary: 'Permanent Delete User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Delete(':id')
    async permanentDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.serviceSubCategoryService.permanentDelete(id, user.id);
    }

}

@Controller('admin/service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @ApiOperation({ summary: 'Create User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Post()
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.serviceService.create(createServiceDto);
    }

    @ApiOperation({ summary: 'Get all User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('deletedAt') deletedAt?: boolean,
        @Query('search') search?: string,
        @Query('filterByServiceCategory') filterByServiceCategory?: string,
        @Query('filterByServiceSubCategory') filterByServiceSubCategory?: string,
        @Query('filterByTags') filterByTags?: string[],
    ) {
        if (filterByTags && typeof filterByTags === 'string') {
            filterByTags = [filterByTags]
        }
        return this.serviceService.findAll(limit, offset, deletedAt, search, filterByServiceCategory, filterByServiceSubCategory, filterByTags)
       
    }

    @ApiOperation({ summary: 'Get One User by Id' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.serviceService.findOne(id);
    }

    @ApiOperation({ summary: 'Update User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.serviceService.update(id, updateServiceDto);

    }

    @ApiOperation({ summary: 'Soft Delete User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.serviceService.remove(id, user.id);
    }


    @ApiOperation({ summary: 'Permanent Delete User' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async permanentDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.serviceService.permanentDelete(id, user.id);
    }

}


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

@Controller('admin/city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @ApiOperation({ summary: 'Create city' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Post()
    create(@Body() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @ApiOperation({ summary: 'Get all city' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('deletedAt') deletedAt?: boolean,
        @Query('search') search?: string,
    ) {

        return this.cityService.findAll(limit, offset, deletedAt, search)
       
    }

    @ApiOperation({ summary: 'Get One city by Id' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cityService.findOne(id);
    }

    @ApiOperation({ summary: 'Update city' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
        return this.cityService.update(id, updateCityDto);

    }

    @ApiOperation({ summary: 'Soft Delete city' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.cityService.remove(id, user.id);
    }


    @ApiOperation({ summary: 'Permanent Delete city' })
    @ApiResponse({ status: 200, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async permanentDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
                const authuser = req.user;
        if (!authuser) {
            throw new UnauthorizedException('Access token has expired');
        }
        const user: UserDto = await firstValueFrom(authuser)
        return this.cityService.permanentDelete(id, user.id);
    }

}