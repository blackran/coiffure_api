import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateEntityDto } from 'src/entity/dto/create-entity.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let createdUser = await this.usersService.create(<Prisma.UserCreateInput>createUserDto)
    delete(createdUser.password);
    return createdUser;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    let args = this.parsePrismaArgs(prismaArgs);
    let users = await this.usersService.findAll(args);
    // Remove passowrd from the users
    users.map((user)=> {
      delete(user.password);
    })
    return users;
  }

  @Get(':id')
  @ApiQuery({name: 'args', required: false})
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    let args = this.parsePrismaArgs(prismaArgs);
    let user = await this.usersService.findOne(id, args);
    delete(user.password);
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let udpatedUser = await this.usersService.update(id, <Prisma.UserUpdateInput>updateUserDto);
    delete (udpatedUser.password);
    return udpatedUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/roles/:roleId')
  addPermission(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.usersService.addRole(id, roleId);
  }

  @Delete(':id/roles/:roleId')
  removePermission(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.usersService.removeRole(id, roleId);
  }

  @Post(":userId/entity/:entityId")
  async addEntity(@Param("userId") userId: string, @Param('entityId') entityId: string) {
    let updatedUser: any = await this.usersService.addEntity(userId, entityId);
    // remove the hased password from the database result
    delete(updatedUser.password);
    return updatedUser;
  }
  @Delete(":userId/entity/:entityId")
  async removeEntity(@Param("userId") userId: string, @Param('entityId') entityId: string) {
    let updatedUser: any = await this.usersService.removeEntity(userId, entityId);
    // remove the hased password from the database result
    delete (updatedUser.password);
    return updatedUser;
  }

  @Post(":userId/entity")
  async createEntity(@Param("userId") userId: string, @Body() createEntityDto: CreateEntityDto) {
    let updateUser = await this.usersService.createEntity(userId, createEntityDto);
    return updateUser;
  }

  /**
   * Parse prisma string argument to a JSON format
   * @param prismaArgs 
   * @returns JSON // the argument in a JSON object
   */
  private parsePrismaArgs(prismaArgs) {
    try {
      let args = {};
      if (prismaArgs) {
        args = JSON.parse(prismaArgs);
      }
      return args;
    } catch (error) {
      throw new BadRequestException(`params args must be a strigify JSON format`);
    }
  }
}
