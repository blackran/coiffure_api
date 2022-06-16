import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreneauService } from './creneau.service';
import { CreateCreneauDto } from './dto/create-creneau.dto';
import { UpdateCreneauDto } from './dto/update-creneau.dto';
import { Prisma } from '@prisma/client';

@Controller('creneau')
@ApiTags('Creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @Post()
  create(@Body() createCreneauDto: CreateCreneauDto) {
    return this.creneauService.create(<Prisma.CreneauCreateManyInput>createCreneauDto);
  }

  @Get()
  findAll() {
    return this.creneauService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creneauService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreneauDto: UpdateCreneauDto) {
    return this.creneauService.update(id, <Prisma.CreneauUpdateInput>updateCreneauDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creneauService.remove(id);
  }
}
