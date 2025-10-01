/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, BadRequestException, UploadedFiles } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventCenterDto, UpdateEventCenterDto, } from '@shared/contracts/eventcenters';
import { UserDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { AccountStatusGuard } from '../jwt/account.status..guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImageUploadDto } from '@shared/contracts';

// Extend the Request type to include 'user'
interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}
@Controller('event-centers')
export class EventcentersController {
    constructor(
        private readonly eventcentersService: EventcentersService,
        private readonly cloudinaryService: CloudinaryService
    ) { }


    @UseGuards(JwtAuthGuard, VerificationGuard, AccountStatusGuard)
    @Post('create')
    async create(@Body() createEventcenterDto: any) {
        return this.eventcentersService.create(createEventcenterDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AccountStatusGuard)
    @UseInterceptors(FilesInterceptor('imagefiles'))
    @Post(':id')
    async upload( @Param('id') id: string, @UploadedFiles() imagefiles: Express.Multer.File[]) {

        if (!imagefiles || imagefiles.length === 0) {
            throw new BadRequestException('No images or videos uploaded for event centers uploaded');
        }
        // Validate each file using your DTO
        const uploadDtos = imagefiles.map((file) =>
            plainToInstance(ImageUploadDto, { file }),
        );

        for (const dto of uploadDtos) {
            const errors = await validate(dto);
            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }
        }
        const folder = 'entapp-api/banquetpro-api/event-centers'
        // Upload each valid image to Cloudinary
        const results = await Promise.all(
            uploadDtos.map((dto) =>
                this.cloudinaryService.uploadStream(dto.file.buffer, folder),
            )
        );
        const imageUrls:string[] = []
        for (const imageUrl of results){ imageUrls.push(imageUrl.secure_url)}
        const updateEventcenterDto: UpdateEventCenterDto = {images:imageUrls}
        return this.eventcentersService.update(id, updateEventcenterDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventcentersService.findOne(id);
    }

    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('serviceProvider') serviceProvider: string,
        @Query('city') city: string,  
        @Query('state') state: string,
        @Query('country') country: string,
        @Query('search') search: string,
    ) {
        return this.eventcentersService.findAll(limit, offset, serviceProvider, city, state, country, search);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEventcenterDto: UpdateEventCenterDto) {
        return this.eventcentersService.update(id, updateEventcenterDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.eventcentersService.remove(id, user.id);
    }
}
