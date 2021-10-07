import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateModelDto {
  @ApiProperty({ description: 'number of request to increment.' })
  @IsInt()
  num_requests: number;
}
