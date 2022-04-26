import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from "class-validator";
import { CreateEntityDto } from "src/entity/dto/create-entity.dto";

export class ProfessionalRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  lastName: String

  @ApiPropertyOptional()
  @IsOptional()
  firstName?: String

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: String

  @ApiPropertyOptional()
  @IsOptional()
  phone?: String

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: String

  @ApiPropertyOptional()
  @IsOptional()
  address?: String

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  birthDate?: Date

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEntityDto)
  entities : CreateEntityDto
}