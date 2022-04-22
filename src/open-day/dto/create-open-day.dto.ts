import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { isDate } from "util/types";

enum Days {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export class CreateOpenDayDto {
  
  @ApiProperty({enum: Days})
  @IsNotEmpty()
  @IsEnum(Days)
  day: Days;

  @ApiPropertyOptional()
  @IsDateString()
  startHour: Date;

  @ApiPropertyOptional()
  @IsDateString()
  endHour: Date;

  @ApiProperty()
  @IsMongoId()
  entityIDs?: String;
}
