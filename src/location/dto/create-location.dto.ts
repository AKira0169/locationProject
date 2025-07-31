import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;

  @IsArray()
  @IsNumber({}, { each: true })
  tags: number[];
}
