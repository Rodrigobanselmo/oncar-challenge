import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class IncludesQueryDto {
  @ApiProperty({
    description: 'if equals "get" should bring the model related to the car.',
  })
  @IsString()
  @IsOptional()
  readonly model: string;

  @ApiProperty({
    description: 'if equals "get" should bring the brand related to the car.',
  })
  @IsString()
  @IsOptional()
  readonly brand: string;
}
