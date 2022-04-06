import { forwardRef, Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { UsersModule } from 'src/users/users.module';
import { CreateEntityDto } from './dto/create-entity.dto';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [EntityController],
  providers: [EntityService, CreateEntityDto],
  exports: [EntityService, CreateEntityDto]
})
export class EntityModule {}
