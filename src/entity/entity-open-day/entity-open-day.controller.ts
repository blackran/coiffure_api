import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { CreateOpenDayDto } from 'src/open-day/dto/create-open-day.dto';
import { UpdateOpenDayDto } from 'src/open-day/dto/update-open-day.dto';
import { OpenDayService } from 'src/open-day/open-day.service';

@Controller('entity/:id/open-day')
@ApiTags('Etities')
export class EntityOpenDayController {
  constructor(private readonly openDayService: OpenDayService) { }

  @ApiParam({name: 'id', required: true})
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
