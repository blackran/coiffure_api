import { Test, TestingModule } from '@nestjs/testing';
import { OpenDayController } from './open-day.controller';
import { OpenDayService } from './open-day.service';

describe('OpenDayController', () => {
  let controller: OpenDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenDayController],
      providers: [OpenDayService],
    }).compile();

    controller = module.get<OpenDayController>(OpenDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
