import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateModelDto {
  @ApiProperty({ description: 'car model name.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'brand name related to the model.' })
  @IsString()
  brandName: string;
}
