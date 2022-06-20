import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsEmail,
} from 'class-validator';

class Localisation {
  @ApiPropertyOptional()
  address?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;
}

export class CreateEntityDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  siret: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  // @ApiProperty()
  // @IsOptional()
  // roleIDs?: any;
  //
  // @ApiProperty()
  // @IsOptional()
  // isActif?: any;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Localisation)
  location: Localisation;
}
