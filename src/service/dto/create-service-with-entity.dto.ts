import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateEntityDto } from 'src/entity/dto/create-entity.dto';
import { CreateServiceDto } from './create-service.dto';

export class CreateSericeWithEntityDto extends CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEntityDto)
  entities: CreateEntityDto;
}
