import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";

export class CreateCreneauDto {

  @ApiPropertyOptional()
  @IsDateString()
  startHour: Date;

  @ApiPropertyOptional()
  @IsDateString()
  endHour: Date;

  @ApiProperty()
  @IsMongoId()
  openDayId?: String;
}
