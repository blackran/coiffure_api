import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PermissionsModule } from './permissions/permissions.module';
import { OpenDayModule } from './open-day/open-day.module';
import { AddressModule } from './address/address.module';
import { CreneauModule } from './creneau/creneau.module';
import { BookingModule } from './booking/booking.module';
import { PrismaModule } from './prisma/prisma.module';
import { EntityModule } from './entity/entity.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    PrismaModule,
    PermissionsModule,
    EntityModule,
    AddressModule,
    OpenDayModule,
    CreneauModule,
    BookingModule,
    ImagesModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
