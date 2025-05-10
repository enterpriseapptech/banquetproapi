import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto, NotificationFilter, UpdateNotificationDto} from '@shared/contracts/notifications'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationService) {}

  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, VerificationGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @ApiOperation({ summary: 'get all notification' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('search')  search?: string,
    @Query('filter') filter?: NotificationFilter) {
    return this.notificationsService.findAll(limit, offset, search, filter);
  }

  @ApiOperation({ summary: 'find one notification' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @ApiOperation({ summary: 'update notification' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }


  @ApiOperation({ summary: 'delete notification' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id, id);
  }
}



// @ApiTags('reviews')
// @Controller('reviews')
// export class ReviewController {
//   constructor(private readonly reviewService: ReviewService) {}

//   @ApiOperation({ summary: 'Create notification' })
//   @ApiResponse({ status: 200, description: 'Success' })
//   @Post()
//   create(@Body() createNotificationDto: CreateNotificationDto) {
//     return this.notificationsService.create(createNotificationDto);
//   }

//   @ApiOperation({ summary: 'get all notification' })
//   @ApiResponse({ status: 200, description: 'Success' })
//   @Get()
//   findAll() {
//     return this.notificationsService.findAll();
//   }

//   @ApiOperation({ summary: 'find one notification' })
//   @ApiResponse({ status: 200, description: 'Success' })
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.notificationsService.findOne(+id);
//   }

//   @ApiOperation({ summary: 'update notification' })
//   @ApiResponse({ status: 200, description: 'Success' })
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
//     return this.notificationsService.update(+id, updateNotificationDto);
//   }


//   @ApiOperation({ summary: 'delete notification' })
//   @ApiResponse({ status: 200, description: 'Success' })
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.notificationsService.remove(+id);
//   }
// }
