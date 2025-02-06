import { Test, TestingModule } from '@nestjs/testing';
import { EventcentersController } from './eventcenters.controller';
import { EventcentersService } from './eventcenters.service';

describe('EventcentersController', () => {
  let controller: EventcentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventcentersController],
      providers: [EventcentersService],
    }).compile();

    controller = module.get<EventcentersController>(EventcentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
