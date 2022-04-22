import { Injectable } from '@nestjs/common';
import { CreateOpenDayDto } from './dto/create-open-day.dto';
import { UpdateOpenDayDto } from './dto/update-open-day.dto';

@Injectable()
export class OpenDayService {
  create(createOpenDayDto: CreateOpenDayDto) {
    return 'This action adds a new openDay';
  }

  findAll() {
    return `This action returns all openDay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openDay`;
  }

  update(id: number, updateOpenDayDto: UpdateOpenDayDto) {
    return `This action updates a #${id} openDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} openDay`;
  }
}
