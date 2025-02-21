import { Test, TestingModule } from '@nestjs/testing';
import { CateringController } from './catering.controller';
import { CateringService } from './catering.service';

describe('CateringController', () => {
  let cateringController: CateringController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CateringController],
      providers: [CateringService],
    }).compile();

    cateringController = app.get<CateringController>(CateringController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cateringController.getHello()).toBe('Hello World!');
    });
  });
});
