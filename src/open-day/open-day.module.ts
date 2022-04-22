import { Module } from '@nestjs/common';
import { OpenDayService } from './open-day.service';
import { OpenDayController } from './open-day.controller';
import { CreateOpenDayDto } from './dto/create-open-day.dto';
import { UpdateOpenDayDto } from './dto/update-open-day.dto';

@Module({
  controllers: [OpenDayController],
  providers: [OpenDayService, CreateOpenDayDto, UpdateOpenDayDto],
  exports: [CreateOpenDayDto, UpdateOpenDayDto, OpenDayService]
})
export class OpenDayModule {}
