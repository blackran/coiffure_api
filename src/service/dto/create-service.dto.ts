import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  entityIDs?: any;
}
