import { Test, TestingModule } from '@nestjs/testing';
import { CateringService } from './catering.service';

describe('CateringService', () => {
  let service: CateringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CateringService],
    }).compile();

    service = module.get<CateringService>(CateringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
