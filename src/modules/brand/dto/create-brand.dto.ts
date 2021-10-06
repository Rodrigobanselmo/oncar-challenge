import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'car brand.' })
  @IsString()
  @Length(1, 50)
  readonly name: string;
}
