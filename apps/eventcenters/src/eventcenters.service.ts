import { Injectable } from '@nestjs/common';

@Injectable()
export class EventcentersService {
  getHello(): string {
    return 'Hello World!';
  }
}
