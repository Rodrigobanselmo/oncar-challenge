import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParamsModelDto {
  @ApiProperty({ description: 'car model name.' })
  @IsString()
  modelName: string;

  @ApiProperty({ description: 'brand name related to the model.' })
  @IsString()
  brandName: string;
}
