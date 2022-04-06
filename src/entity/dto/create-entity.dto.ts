import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

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
}
