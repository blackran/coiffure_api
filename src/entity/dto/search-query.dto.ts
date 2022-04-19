import { IsLatitude, IsLongitude, IsNotEmpty } from "class-validator";

export class SearchQueryDto {
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  distance: number;
}