import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpenDayService } from './open-day.service';
import { CreateOpenDayDto } from './dto/create-open-day.dto';
import { UpdateOpenDayDto } from './dto/update-open-day.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('open-day')
@ApiTags('Open day')
export class OpenDayController {
  constructor(private readonly openDayService: OpenDayService) {}

  @Post()
  create(@Body() createOpenDayDto: CreateOpenDayDto) {
    return this.openDayService.create(createOpenDayDto);
  }

  @Get()
  findAll() {
    return this.openDayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.openDayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpenDayDto: UpdateOpenDayDto) {
    return this.openDayService.update(+id, updateOpenDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.openDayService.remove(+id);
  }
}
