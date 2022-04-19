import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

class Localisation {
  @ApiPropertyOptional()
  address?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
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
  location: Localisation;
}
