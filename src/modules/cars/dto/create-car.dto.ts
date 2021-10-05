import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
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

  @ApiProperty({ description: 'car price.' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: '2020/2021',
    description: 'manufacture year of the car',
  })
  @MaxLength(9)
  @IsString()
  readonly year: string;

  @ApiProperty({ description: 'car mileage in kilometers.' })
  @IsString()
  readonly kilometers: string;

  @ApiProperty({ description: 'car fuel type.' })
  // @IsIn(FuelOptions[])
  @IsString()
  readonly fuel: string;

  @ApiProperty({ description: 'car description.' })
  @IsOptional()
  @IsString()
  readonly desc: string;

  @ApiProperty({ description: 'car model id.' })
  @IsString()
  readonly modelId: string;

  @ApiProperty({ description: 'car brand id.' })
  @IsString()
  readonly brandId: string;
}
