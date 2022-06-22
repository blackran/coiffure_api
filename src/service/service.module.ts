import { forwardRef, Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  // imports: [EntityModule],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService]
})
export class ServiceModule {}
