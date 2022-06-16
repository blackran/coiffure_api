import { Injectable } from '@nestjs/common';
import { CreateOpenDayDto } from './dto/create-open-day.dto';
import { UpdateOpenDayDto } from './dto/update-open-day.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OpenDayService {

  constructor(private readonly prisma: PrismaService) {}

  create(openDay: Prisma.OpenDayCreateManyInput) {
    return this.prisma.openDay.create({
      data: openDay,
    });
  }

  findAll() {
    return this.prisma.openDay.findMany();
  }

  findOne(id: string) {
    return this.prisma.openDay.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, openDay: Prisma.OpenDayUpdateInput) {
    return this.prisma.openDay.update({
      where: {
        id,
      },
      data: openDay,
    });
  }

  remove(id: string) {
    return this.prisma.openDay.delete({
      where: {
        id,
      },
    });
  }
}
