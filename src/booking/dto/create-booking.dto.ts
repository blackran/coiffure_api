import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";

export class CreateBookingDto {

  @ApiPropertyOptional()
  @IsDateString()
  date: Date;
  
  @ApiProperty()
  @IsMongoId()
  creneauId?: String;

  @ApiProperty()
  @IsMongoId()
  userId?: String;
}
