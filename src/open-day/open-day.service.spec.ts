import { Test, TestingModule } from '@nestjs/testing';
import { OpenDayService } from './open-day.service';

describe('OpenDayService', () => {
  let service: OpenDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenDayService],
    }).compile();

    service = module.get<OpenDayService>(OpenDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
