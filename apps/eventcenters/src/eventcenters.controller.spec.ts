/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventcentersController } from './eventcenters.controller';
import { EventcentersService } from './eventcenters.service';

describe('EventcentersController', () => {
  let eventcentersController: EventcentersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventcentersController],
      providers: [EventcentersService],
    }).compile();

    eventcentersController = app.get<EventcentersController>(EventcentersController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(eventcentersController.getHello()).toBe('Hello World!');
  //   });
  // });
});
