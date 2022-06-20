import { Controller } from '@nestjs/common';
import {
  Get,
  Post,
  Body,
  Patch,
  Delete,
  // UseGuards,
  Param,
} from '@nestjs/common';
// import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { UpdateServiceDto } from 'src/service/dto/update-service.dto';
import { Prisma } from '@prisma/client';
import { ServiceService } from './service.service';

@ApiTags('Service')
// @UseGuards(JwtGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const createdService = await this.serviceService.create(
      <Prisma.ServiceCreateInput>createServiceDto,
    );
    return createdService;
  }

  @Get()
  async findAll() {
    const services = await this.serviceService.findAll();
    return services;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await this.serviceService.findOne(id);
    return service;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const udpatedService = await this.serviceService.update(
      id,
      <Prisma.ServiceUpdateInput>updateServiceDto,
    );
    return udpatedService;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
