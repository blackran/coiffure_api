import { Test, TestingModule } from '@nestjs/testing';
import { EntityOpenDayController } from './entity-open-day.controller';

describe('EntityOpenDayController', () => {
  let controller: EntityOpenDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityOpenDayController],
    }).compile();

    controller = module.get<EntityOpenDayController>(EntityOpenDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
