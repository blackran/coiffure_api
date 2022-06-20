import { forwardRef, Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { UsersModule } from 'src/users/users.module';
import { CreateEntityDto } from './dto/create-entity.dto';
import { OpenDayModule } from 'src/open-day/open-day.module';
import { EntityOpenDayController } from './entity-open-day/entity-open-day.controller';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ServiceModule),
    OpenDayModule,
  ],
  controllers: [EntityController, EntityOpenDayController],
  providers: [EntityService, CreateEntityDto],
  exports: [EntityService, CreateEntityDto],
})
export class EntityModule { }
