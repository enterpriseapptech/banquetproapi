/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CreateCateringDto, UpdateCateringDto } from '@shared/contracts/catering';
import { UserDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { AccountStatusGuard } from '../jwt/account.status..guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


// Extend the Request type to include 'user'
interface AuthenticatedRequest extends Request {
  user?: any; // Change `any` to your actual user type if known
}

@ApiTags('catering')
@Controller('catering')
export class CateringController {
  constructor(private readonly cateringService: CateringService) { }


  @ApiOperation({ summary: 'Create catering' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, VerificationGuard, AccountStatusGuard)
  @Post()
  create(@Body() createCateringDto: CreateCateringDto) {
    return this.cateringService.create(createCateringDto);
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
  ) {
    return this.cateringService.findAll(limit, offset, serviceProvider, city, state, country);
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
