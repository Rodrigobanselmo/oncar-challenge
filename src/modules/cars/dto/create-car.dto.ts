import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

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
  @Matches(/\d*\/\d*/g)
  @MaxLength(9)
  @IsString()
  readonly year: string;

  @ApiProperty({ description: 'car mileage in kilometers.' })
  @IsNumber()
  readonly kilometers: number;

  @ApiProperty({ description: 'car fuel type.' })
  // @IsIn(FuelOptions[])
  @IsString()
  readonly fuel: string;

  @ApiProperty({ description: 'car description.' })
  @IsOptional()
  @IsString()
  readonly desc?: string;

  @ApiProperty({ description: 'car model id.' })
  @IsNumber()
  readonly modelId: number;

  @ApiProperty({ description: 'car brand id.' })
  @IsNumber()
  readonly brandId: number;
}
