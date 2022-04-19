import { Injectable } from '@nestjs/common';
import * as NodeGeocoder from 'node-geocoder'; 
@Injectable()
export class AddressService {
  private geocoder
  constructor() {
    const options: any = {
      provider: 'mapquest',
      apiKey: 'v5Qv4TDAvG91bziKQiCulu6BQ3XIA7cA', // for Mapquest, OpenCage, Google Premier
      formatter: null // 'gpx', 'string', ...
    };

    this.geocoder = NodeGeocoder(options);
  }

  async geodoce(address: String) {
    let data = await this.geocoder.geocode(address);
    return data;
  }
}
