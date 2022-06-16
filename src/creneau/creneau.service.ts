import { Injectable } from '@nestjs/common';
import { CreateCreneauDto } from './dto/create-creneau.dto';
import { UpdateCreneauDto } from './dto/update-creneau.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreneauService {

  constructor(private readonly prisma: PrismaService) {}

  create(creneau: Prisma.CreneauCreateManyInput) {
    return this.prisma.creneau.create({
      data: creneau,
    });
  }

  findAll() {
    return this.prisma.creneau.findMany();
  }

  findOne(id: string) {
    return this.prisma.creneau.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, creneau: Prisma.CreneauUpdateInput) {
    return this.prisma.creneau.update({
      where: {
        id,
      },
      data: creneau,
    });
  }

  remove(id: string) {
    return this.prisma.creneau.delete({
      where: {
        id,
      },
    });
  }
}
