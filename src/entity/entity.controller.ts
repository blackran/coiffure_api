import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SearchQueryDto } from './dto/search-query.dto';

@Controller('entity')
@ApiTags('Etities')
// @ApiBearerAuth()
// @UseGuards(JwtGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) { }

  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Get()
  findAll() {
    return this.entityService.findAll();
  }

  @Get('search')
  @ApiQuery({ name: 'longitude', required: true, type: "number"})
  @ApiQuery({ name: 'latitude', required: true, type: "number"})
  @ApiQuery({ name: 'distance', required: true, type: "number"})
  search(@Query() query: SearchQueryDto) {
    return this.entityService.search(+query.longitude, +query.latitude, +query.distance);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(id);
  }

  @Post(':entityId/users/:userId')
  addUser(@Param('entityId') entityId: string, @Param('userId') userId: string) {
    return this.entityService.addUser(entityId, userId);
  }

  @Delete(':entityId/users/:userId')
  removeUser(@Param('entityId') entityId: string, @Param('userId') userId: string) {
    return this.entityService.removeUser(entityId, userId);
  }
}
