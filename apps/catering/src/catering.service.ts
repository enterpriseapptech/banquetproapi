import { Injectable } from '@nestjs/common';

@Injectable()
export class CateringService {
  getHello(): string {
    return 'Hello World!';
  }
}
