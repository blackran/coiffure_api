import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { UpdateOpenDayDto } from 'src/open-day/dto/update-open-day.dto';
import { OpenDayService } from 'src/open-day/open-day.service';
import CreateOpenDayDto from '../dto/create-open-day.dto';

@Controller('entity/:id/open-day')
@ApiTags('Etities')
export class EntityOpenDayController {
  constructor() { }

  @ApiParam({name: 'id', required: true})
  @Post()
  create(@Param('id') id, @Body() createOpenDayDto: CreateOpenDayDto) {
    
  }

  @ApiParam({ name: 'id', required: true })
  @Get()
  findAll(@Param('id') id,) {
    
  }

  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  findOne(@Param('id') id, @Param('openDayId') OpenDayId: string) {
    
  }

  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  update(@Param('id') id, @Param('openDayId') openDayId: string, @Body() updateOpenDayDto: UpdateOpenDayDto) {
    
  }

  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  remove(@Param('id') id, @Param('OpenDayId') openDayId: string) {
    
  }
}
