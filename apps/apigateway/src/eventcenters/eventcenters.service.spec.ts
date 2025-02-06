import { Test, TestingModule } from '@nestjs/testing';
import { EventcentersService } from './eventcenters.service';

describe('EventcentersService', () => {
  let service: EventcentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventcentersService],
    }).compile();

    service = module.get<EventcentersService>(EventcentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
