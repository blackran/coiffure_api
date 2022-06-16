import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { isDate } from "util/types";

enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export class CreateOpenDayDto {
  
  @ApiProperty({enum: Day})
  @IsNotEmpty()
  @IsEnum(Day)
  day: String;

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
