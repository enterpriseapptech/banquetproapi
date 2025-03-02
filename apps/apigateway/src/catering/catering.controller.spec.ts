import { Test, TestingModule } from '@nestjs/testing';
import { CateringController } from './catering.controller';
import { CateringService } from './catering.service';

describe('CateringController', () => {
  let controller: CateringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CateringController],
      providers: [CateringService],
    }).compile();

    controller = module.get<CateringController>(CateringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
