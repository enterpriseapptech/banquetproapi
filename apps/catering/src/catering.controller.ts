import { Controller, Get } from '@nestjs/common';
import { CateringService } from './catering.service';

@Controller()
export class CateringController {
  constructor(private readonly cateringService: CateringService) {}

  @Get()
  getHello(): string {
    return this.cateringService.getHello();
  }
}
