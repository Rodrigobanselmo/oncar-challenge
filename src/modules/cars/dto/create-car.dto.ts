import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

import { FuelOptions } from '../constants/fuel.constants';

export class CreateCarDto {
  @ApiProperty({ description: 'car plate.' })
  @IsString()
  @Length(7, 8)
  readonly plate: string;

  @ApiProperty({ description: 'car color.' })
  @IsString()
  readonly color: string;

  @ApiProperty({ description: 'car price in cents.' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: ['2020/2021', '20/21'],
    description: 'manufacture year of the car',
  })
  @MaxLength(9)
  @IsString()
  @Matches(/^\d{4}\/\d{4}/, {
    message: 'wrong format for year field. Expected: 2020/2021',
  })
  readonly year: string;

  @ApiProperty({ description: 'car mileage in kilometers.' })
  @IsNumber()
  readonly kilometers: number;

  @ApiProperty({ description: 'car fuel type.' })
  @IsIn(Object.keys(FuelOptions))
  @IsString()
  readonly fuel: string;

  @ApiProperty({ description: 'car description.' })
  @IsOptional()
  @IsString()
  readonly desc?: string;

  @ApiProperty({ description: 'car model name.' })
  @IsString()
  readonly modelName: string;

  @ApiProperty({ description: 'car brand name.' })
  @IsString()
  readonly brandName: string;
}
