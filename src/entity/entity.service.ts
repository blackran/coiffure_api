import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateEntityDto } from './dto/create-entity.dto';

@Injectable()
export class EntityService {
  constructor(private prismaService: PrismaService, @Inject(forwardRef(() => UsersService)) private userService: UsersService) { }

  async create(createEntityDto: CreateEntityDto) {
    try {
      let data: any = createEntityDto;
      if (createEntityDto.location) {
        if (createEntityDto.location.longitude != undefined && createEntityDto.location.longitude != undefined) {
          data.location.coordinates = [createEntityDto.location.longitude, createEntityDto.location.latitude]
          delete (data.location.longitude);
          delete (data.location.latitude);
        }
      }
      let createdEntity = await this.prismaService.entity.create({ data: createEntityDto });
      return createdEntity;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException("Siret already exist");
        } else {
          throw error;
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prismaService.entity.findMany();
  }

  async findOne(id: string) {
    try {
      let entity = await this.prismaService.entity.findUnique({ where: { id: id } });
      if (!entity) {
        throw new NotFoundException(`Etity with id ${id} not found`);
      }
      return entity;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(`Provided hex string ${id} representation must be exactly 12 bytes`)
        }
        throw error;
      }
      throw error;
    }
  }

  async update(id: string, updateEntityDto: Prisma.EntityUpdateInput) {
    await this.findOne(id);
    try {
      let updatedEntity = await this.prismaService.entity.update({ where: { id: id }, data: updateEntityDto });
      return updatedEntity;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException("Siret already exist");
        } else {
          throw error;
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.entity.delete({ where: { id: id } });
  }

  // Link user to an entity
  async addUser(entityId: string, userid: string) {
    // verify if the entity exist
    await this.findOne(entityId);
    // verify if the user exist
    await this.userService.findOne(userid);
    // Link if both the entity and the user exist
    return this.prismaService.entity.update({
      where: { id: entityId }, data: {
        users: {
          connect: { id: userid }
        }
      }
    });
  }

  // Unlink user to an entity
  async removeUser(entityId: string, userid: string) {
    // verify if the entity exist
    await this.findOne(entityId);
    // verify if the user exist
    await this.userService.findOne(userid);
    // Link if both the entity and the user exist
    return this.prismaService.entity.update({
      where: { id: entityId }, data: {
        users: {
          disconnect: { id: userid }
        }
      }
    });
  }

 
  async search(longitude: number, latitude: number, distance: number = 10000) {
    try {
      const entities = await this.prismaService.entity.findRaw({
        filter: {
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
              },
              // $minDistance: 10000,
              $maxDistance: distance
            }
          }
        }
      });
      return entities;
    } catch (error) {
      console.log(error);
    }
  }
}
