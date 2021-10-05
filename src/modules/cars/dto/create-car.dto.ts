import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'car plate.' })
  @IsString()
  @MaxLength(8)
  @MinLength(7)
  readonly plate: string;

  @ApiProperty({ description: 'car color.' })
  @IsString()
  readonly color: string;

  @ApiProperty({ description: 'car price.' })
  @IsString()
  readonly price: string;

  @ApiProperty({ description: 'manufacture year of the car, ex: "2001/2002"' })
  @MaxLength(9)
  @IsString()
  readonly year: string;

  @ApiProperty({ description: 'car mileage in kilometers.' })
  @IsString()
  readonly kilometers: string;

  @ApiProperty({ description: 'car fuel type.' })
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
