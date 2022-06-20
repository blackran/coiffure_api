import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingService {

  constructor(private readonly prisma: PrismaService) {}

  create(booking: Prisma.BookingCreateManyInput) {
    return this.prisma.booking.create({
      data: booking,
    });
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, booking: Prisma.BookingUpdateInput) {
    return this.prisma.booking.update({
      where: {
        id,
      },
      data: booking,
    });
  }

  remove(id: string) {
    return this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}
