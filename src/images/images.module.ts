import { forwardRef, Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { UsersModule } from '../users/users.module';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => EntityModule)],
  controllers: [ImagesController],
})
export class ImagesModule {}
