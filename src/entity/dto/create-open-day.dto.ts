import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty } from "class-validator";

enum Days {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export default class CreateOpenDayDto {
  @ApiProperty({ enum: Days })
  @IsNotEmpty()
  @IsEnum(Days)
  day: Days;

  @ApiPropertyOptional()
  @IsDateString()
  startHour: Date;

  @ApiPropertyOptional()
  @IsDateString()
  endHour: Date;
}