import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class RegisterDto {
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
}
