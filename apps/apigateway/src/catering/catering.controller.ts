/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFiles, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CreateCateringDto, UpdateCateringDto } from '@shared/contracts/catering';
import { UserDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { AccountStatusGuard } from '../jwt/account.status..guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { ImageUploadDto } from '@shared/contracts';
import { validate } from 'class-validator';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { StateService } from '../management/management.service';
import { UsersService } from '../users/users.service';


// Extend the Request type to include 'user'
interface AuthenticatedRequest extends Request {
  user?: any; // Change `any` to your actual user type if known
}

@ApiTags('catering')
@Controller('catering')
export class CateringController {
  constructor(private readonly cateringService: CateringService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly stateService: StateService,
    private readonly userService: UsersService
  ) { }


  @ApiOperation({ summary: 'Create catering' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, VerificationGuard, AccountStatusGuard)
  @Post()
  async create(@Body() createCateringDto: CreateCateringDto) {
    try {
      // validate service provider
      const serviceProvider = await firstValueFrom(this.userService.findOne(createCateringDto.serviceProviderId));

      if (!serviceProvider) {
        throw new NotFoundException("could not verify service provider account")
      }

      if (serviceProvider?.status !== "ACTIVE") {
        throw new UnauthorizedException("service provider account is not active")
      }

      if (!createCateringDto.location) {
        throw new BadRequestException('Location state for this service is required');
      }
      const states = await firstValueFrom(this.stateService.findMany(createCateringDto.location));
      console.log({ states })
      if (!states || states.length === 0) {
        throw new BadRequestException('Invalid location state');
      }
      createCateringDto.location = states.map(state => state.id)
      createCateringDto.serviceProviderEmail = serviceProvider.email
      return this.cateringService.create(createCateringDto);
    } catch (error) {
      console.log(error)
      throw error
    }

  }

  @UseGuards(JwtAuthGuard, VerificationGuard, AccountStatusGuard)
  @UseInterceptors(FilesInterceptor('imagefiles'))
  @Post(':id')
  async upload(@Param('id') id: string, @UploadedFiles() imagefiles: Express.Multer.File[]) {

    if (!imagefiles || imagefiles.length === 0) {
      throw new BadRequestException('No images or videos uploaded for catering uploaded');
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
    const folder = 'entapp-api/banquetpro-api/catering'
    console.log({ folder })
    // Upload each valid image to Cloudinary
    const results = await Promise.all(
      uploadDtos.map((dto) =>
        this.cloudinaryService.uploadStream(dto.file.buffer, folder),
      )
    );
    const imageUrls: string[] = []
    for (const imageUrl of results) { imageUrls.push(imageUrl.secure_url) }
    const updateCateringDto: UpdateCateringDto = { images: imageUrls }
    return this.cateringService.update(id, updateCateringDto);
  }

  @Get('/bookmarks')
  findAllWithUnique(
      @Query('ids') ids: string[],
  ) {
        return this.cateringService.findAllWithUnique(ids);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cateringService.findOne(id);
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
    return this.cateringService.findAll(limit, offset, serviceProvider, city, state, country, search);
  }

  @UseGuards(JwtAuthGuard, VerificationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCateringDto: UpdateCateringDto) {
    return this.cateringService.update(id, updateCateringDto);
  }

  @UseGuards(JwtAuthGuard, VerificationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const user: UserDto = await firstValueFrom(req.user)
    return this.cateringService.remove(id, user.id);
  }
}
