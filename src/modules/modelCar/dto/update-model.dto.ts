import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateModelDto {
  @ApiProperty({ description: 'number of request to increment.' })
  @IsNumber()
  num_requests: number;
}
