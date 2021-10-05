import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateModelDto {
  @ApiProperty({ description: 'car model name.' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'brand id related this model.' })
  @IsNumber()
  brandId: number;
}
