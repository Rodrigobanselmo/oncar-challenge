import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'car brand.' })
  @IsString()
  @MaxLength(50)
  readonly brand: string;
}
