import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  // forwardRef,
  // Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ServiceService } from 'src/service/service.service';
import { CreateEntityDto } from './dto/create-entity.dto';

@Injectable()
export class EntityService {
  constructor(
    private prismaService: PrismaService, private serviceService: ServiceService,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService
  ) {}

  async create(createEntityDto: CreateEntityDto) {
    try {
      const data: any = createEntityDto;
      if (createEntityDto.location) {
        if (
          !createEntityDto.location.longitude &&
          !createEntityDto.location.longitude
        ) {
          data.location.coordinates = [
            createEntityDto.location.longitude,
            createEntityDto.location.latitude,
          ];
          delete(data.location.longitude);
          delete(data.location.latitude);
        }
      }
      const createdEntity = await this.prismaService.entity.create({
        data: createEntityDto,
      });
      return createdEntity;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Siret already exist');
        } else {
          throw error;
        }
      }
      throw error;
    }
  }

  findAll(context: any) {
    const queryObj = { ...context.query };
    const search = context.query.search;
    const excludeField = ['search', 'page', 'sort', 'limit', 'fields'];
    excludeField.map((el) => delete queryObj[el]);
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // pagination
    const page = context.query.page * 1 || 1;
    const limit = context.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const orderBy = [];
    if (context.query.sort) {
      context.query.sort.split(',').map((st: string) => {
        orderBy.push({ [st]: 'desc' });
      });
    }

    const searchTab = [];
    const searchLabel = ['name', 'email'];
    let where = {};
    if (search) {
      searchLabel.map((st: string) => {
        searchTab.push({
          [st]: {
            contains: search,
            mode: 'insensitive',
          },
        });
      });

      where = { OR: searchTab };
    }

    if (JSON.stringify(queryObj) !== '{}') {
      where = { ...where, ...queryObj };
    }

    return this.prismaService.entity.findMany({
      where,
      orderBy: orderBy,
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    try {
      const entity = await this.prismaService.entity.findUnique({
        where: { id: id },
      });
      if (!entity) {
        throw new NotFoundException(`Etity with id ${id} not found`);
      }
      return entity;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Provided hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      throw error;
    }
  }

  async update(id: string, updateEntityDto: Prisma.EntityUpdateInput) {
    await this.findOne(id);
    try {
      const updatedEntity = await this.prismaService.entity.update({
        where: { id: id },
        data: updateEntityDto,
      });
      return updatedEntity;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Siret already exist');
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
  async addService(entityId: string, serviceid: string) {
    // verify if the entity exist
    await this.findOne(entityId);
    // verify if the user exist
    const service = await this.serviceService.findOne(serviceid);
    // Link if both the entity and the user exist
    return this.prismaService.entity.update({
      where: { id: entityId },
      data: {
        service: {
          connect: {
            id: service.id,
          },
        },
      },
    });
  }

  // Unlink user to an entity
  async removeService(entityId: string, serviceid: string) {
    // verify if the entity exist
    await this.findOne(entityId);
    // verify if the user exist
    const service = await this.serviceService.findOne(serviceid);
    // Link if both the entity and the user exist
    return this.prismaService.entity.update({
      where: { id: entityId },
      data: {
        service: {
          disconnect: {
            id: service.id,
          },
        },
      },
    });
  }

  // Link user to an entity
  async addUser(entityId: string, userid: string) {
    // verify if the entity exist
    await this.findOne(entityId);
    // verify if the user exist
    await this.userService.findOne(userid);
    // Link if both the entity and the user exist
    return this.prismaService.entity.update({
      where: { id: entityId },
      data: {
        users: {
          connect: {
            id: userid,
          },
        },
      },
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
      where: { id: entityId },
      data: {
        users: {
          disconnect: {
            id: userid,
          },
        },
      },
    });
  }

  async search(longitude: number, latitude: number, distance = 10000) {
    try {
      const entities = await this.prismaService.entity.findRaw({
        filter: {
          location: {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              // $minDistance: 10000,
              $maxDistance: distance,
            },
          },
        },
      });
      return entities;
    } catch (error) {
      console.log(error);
    }
  }
}
