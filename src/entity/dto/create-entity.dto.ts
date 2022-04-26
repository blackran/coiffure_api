import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidateNested } from "class-validator";

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
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  siret: string

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Localisation)
  location: Localisation;
}
