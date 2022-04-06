import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateUserDto {
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

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActif?: boolean
}
