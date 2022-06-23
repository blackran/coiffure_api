import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SearchQueryDto } from './dto/search-query.dto';
// import { Request } from 'express';

@Controller('entity')
@ApiTags('Etities')
export class EntityController {
  constructor(
    private readonly entityService: EntityService,
    private readonly userService: UsersService,
  ) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  findAll(@Req() context: Request) {
    return this.entityService.findAll(context);
  }

  @Get('search')
  @ApiQuery({ name: 'longitude', required: true, type: 'number' })
  @ApiQuery({ name: 'latitude', required: true, type: 'number' })
  @ApiQuery({ name: 'distance', required: true, type: 'number' })
  search(@Query() query: SearchQueryDto) {
    return this.entityService.search(
      +query.longitude,
      +query.latitude,
      +query.distance,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(id, updateEntityDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.entityService.remove(id);
  }

  @Post('users/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async addUser(@Param('userId') userId: string, @Request() req) {
    const user: CreateUserDto = await this.userService.findOne(req.user.id);
    const entity = await this.entityService.findOne(user.entityIDs);
    return this.entityService.addUser(entity.id, userId);
  }

  @Delete('users/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async removeUser(@Param('userId') userId: string, @Request() req) {
    const user: CreateUserDto = await this.userService.findOne(req.user.id);
    const entity = await this.entityService.findOne(user.entityIDs);
    return this.entityService.removeUser(entity.id, userId);
  }

  @Post(':entityId/serivce/:serviceId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async addService(
    @Param('entityId') entityId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.entityService.addService(entityId, serviceId);
  }

  @Delete(':entityId/serivce/:serviceId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  removeService(
    @Param('entityId') entityId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.entityService.removeService(entityId, serviceId);
  }
}
