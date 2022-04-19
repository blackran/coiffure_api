import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('address')
export class AddressController {
  constructor(private addressService: AddressService){}

  @Get('geocode')
  geocode(@Query('address') address: string) {
    return this.addressService.geodoce(address)
  }
}
