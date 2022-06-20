import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesModule } from 'src/roles/roles.module';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [RolesModule, forwardRef(() => EntityModule)],
  controllers: [UsersController],
  providers: [UsersService, CreateUserDto],
  exports: [UsersService, CreateUserDto],
})
export class UsersModule {}
