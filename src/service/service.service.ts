import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prismaService: PrismaService) { }

  async create(createServiceDto: Prisma.ServiceCreateInput) {
    try {
      const createdService = await this.prismaService.service.create({
        data: createServiceDto,
      });
      return createdService;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const services = await this.prismaService.service.findMany();
      return services;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const service = await this.prismaService.service.findUnique({
        where: { id },
      });
      if (!service) {
        throw new NotFoundException(`Service with id ${id} not found`);
      }
      return service;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateServiceDto: Prisma.ServiceUpdateInput) {
    await this.findOne(id);
    try {
      const updatedService = await this.prismaService.service.update({
        where: { id },
        data: updateServiceDto,
      });
      return updatedService;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.service.delete({ where: { id } });
  }
}
