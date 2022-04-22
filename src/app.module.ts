import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';
import { EntityModule } from './entity/entity.module';
import { AddressModule } from './address/address.module';
import { OpenDayModule } from './open-day/open-day.module';
import { CreneauModule } from './creneau/creneau.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, RolesModule, UsersModule, PrismaModule, PermissionsModule, EntityModule, AddressModule, OpenDayModule, CreneauModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
