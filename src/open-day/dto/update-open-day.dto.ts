import { PartialType } from '@nestjs/swagger';
import { CreateOpenDayDto } from './create-open-day.dto';

export class UpdateOpenDayDto extends PartialType(CreateOpenDayDto) {}
