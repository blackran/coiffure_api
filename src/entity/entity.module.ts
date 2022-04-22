import { forwardRef, Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { UsersModule } from 'src/users/users.module';
import { CreateEntityDto } from './dto/create-entity.dto';
import { OpenDayModule } from 'src/open-day/open-day.module';
import { EntityOpenDayController } from './entity-open-day/entity-open-day.controller';

@Module({
  imports: [forwardRef(() => UsersModule), OpenDayModule],
  controllers: [EntityController, EntityOpenDayController],
  providers: [EntityService, CreateEntityDto],
  exports: [EntityService, CreateEntityDto]
})
export class EntityModule {}
