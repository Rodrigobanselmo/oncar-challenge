import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'car brand.' })
  @IsString()
  @Length(1, 50)
  readonly brand: string;
}
