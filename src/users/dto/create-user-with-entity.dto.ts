import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateEntityDto } from "src/entity/dto/create-entity.dto";
import { CreateUserDto } from "./create-user.dto";

export class CreateUserWithEntityDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEntityDto)
  entities: CreateEntityDto
}