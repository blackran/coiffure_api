import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
import { RolesService } from 'src/roles/roles.service';
import { EntityService } from 'src/entity/entity.service';
import { CreateEntityDto } from 'src/entity/dto/create-entity.dto';
import { CreateUserWithEntityDto } from './dto/create-user-with-entity.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService, private rolesService: RolesService, @Inject(forwardRef(() => EntityService)) private entityService: EntityService) {}
  
  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      let hasedPassword = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt(10))
      createUserDto.password = hasedPassword;
      let createdUser = await this.prismaService.user.create({ data: createUserDto });
      return createdUser;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException("Email already exist");
        } else {
          throw error;
        }
      }
      // Handle validation error 
      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid date')
      }
      throw error;
    }
  }

  async createWithEntity(createUserDto: CreateUserWithEntityDto) {
    try {
      let data: any = createUserDto;
      let hasedPassword = await bcrypt.hash(data.password, await bcrypt.genSalt(10))
      data.password = hasedPassword;
      // let createdUser = await this.prismaService.user.create({ data: createUserDto });
      // Transform data.entities.location to match the prisma model
      if (createUserDto.entities.location) {
        if (createUserDto.entities.location.longitude != undefined && createUserDto.entities.location.longitude != undefined) {
          data.entities.location.coordinates = [createUserDto.entities.location.longitude, createUserDto.entities.location.longitude]
          delete (data.entities.location.longitude);
          delete (data.entities.location.latitude);
        }
      }
      // Transform data entities to match the prisma model.
      data.entities = { create: { ...data.entities}};
      let createdUser = await this.prismaService.user.create({data: data});
      return createdUser;
    } catch (error) {
      console.log(error);
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta['target'] = 'Entity_siret_key') {
            throw new ConflictException("Siret already exist");
          }
          throw new ConflictException("Email already exist");
        } else {
          throw error;
        }
      }
      // Handle validation error 
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid date')
      }
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.UserArgs = {}) {
    try {
      let users = await this.prismaService.user.findMany({ ...prismaArgs });
      return users;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        console.log(error)
        throw new BadRequestException(`Query argument validation faild`)
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.UserArgs = {}) {
    try {
      const user = await this.prismaService.user.findUnique({...prismaArgs, where: { id }});
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(`Provided hex string ${id} representation must be exactly 12 bytes`)
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        console.log(error)
        throw new BadRequestException(`Query argument validation faild`)
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.prismaService.user.update({ where: { id }, data: updateUserDto });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    let user = await this.findOne(id);
    return this.prismaService.user.delete({where: {id}});
  }

  async findByEmail(email: string) {
    try {
      const user = this.prismaService.user.findFirst({where: {email}});
      if(!user){
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async addRole(id: string, roleId: string) {
    let user = await this.findOne(id);
    let role = await this.rolesService.findOne(roleId);
    return this.prismaService.user.update({
      where: { id }, data: {
        roles: {
          connect: [{ id: roleId }]
        }
      }
    })
  }
  async removeRole(id: string, roleId: string) {
    let user = await this.findOne(id);
    let role = await this.rolesService.findOne(roleId);
    return this.prismaService.user.update({
      where: { id }, data: {
        roles: {
          disconnect: [{ id: roleId }]
        }
      }
    })
  }

  async addEntity(userId: string, entityId: string) {
    await this.findOne(userId);
    await this.entityService.findOne(entityId);
    return this.prismaService.user.update({where: {id: userId}, data: {
      entities: {
        connect: {id: entityId}
      }
    }});
  }

  async removeEntity(userId: string, entityId: string) {
    await this.findOne(userId);
    await this.entityService.findOne(entityId);
    return this.prismaService.user.update({
      where: { id: userId }, data: {
        entities: {
          disconnect: { id: entityId }
        }
      }
    });
  }

  async createEntity(userId: string, createEntityDto: CreateEntityDto) {
   try {
     let data: any = createEntityDto;
     // add coordinates to data
     if (createEntityDto.location) {
       if (createEntityDto.location.longitude != undefined && createEntityDto.location.longitude != undefined) {
         data.location.coordinates = [createEntityDto.location.longitude, createEntityDto.location.latitude]
         delete (data.location.longitude);
         delete (createEntityDto.location.latitude)
       }
     }
     let updatedUser = await this.prismaService.user.update({
       where: { id: userId }, data: {
         entities: {
           create: data
         }
       }
     });
     return updatedUser;
   } catch (error) {
     // Handle contrainst error
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
       if (error.code === 'P2016') {
         throw new NotFoundException(`User wit id ${userId} not found`)
       }
       if (error.code === 'P2002') {
         throw new ConflictException("Siret already exist");
       } else {
         throw error;
       }
     }
     throw error;
   }
  }

  
}
