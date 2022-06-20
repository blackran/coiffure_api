import { forwardRef, Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { EntityService } from 'src/entity/entity.service';

@Module({
  imports: [EntityService],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
