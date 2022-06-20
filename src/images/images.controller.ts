import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { EntityService } from 'src/entity/entity.service';

import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateEntityDto } from '../entity/dto/update-entity.dto';

const stockUrl = 'uploads/images';
export const storage = {
  storage: diskStorage({
    destination: `./${stockUrl}`,
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
};

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(
    private userService: UsersService,
    private entityService: EntityService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('upload/user')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFileUser(@UploadedFile() file: any, @Request() req) {
    const user: UpdateUserDto = await this.userService.findOne(req.user.id);
    delete (user.id);
    delete (user.password);

    user.image = file.filename;
    return this.userService.update(req.user.id, user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('upload/entity')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFileEntity(@UploadedFile() file: any, @Request() req) {
    const user: CreateUserDto = await this.userService.findOne(req.user.id);
    const entity = await this.entityService.findOne(user.entityIDs);
    // const entity: UpdateEntityDto = await this.entityService.findOne(user.entityIDs[0]);
    console.log(user);
    delete(entity.id);

    entity.image = file.filename;
    return this.entityService.update(user.entityIDs[0], entity);
  }

  @Get(':imagename')
  findImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), stockUrl + '/' + imagename)));
  }
}
