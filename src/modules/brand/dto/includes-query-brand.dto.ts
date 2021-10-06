import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class IncludesQueryBrandDto {
  @ApiProperty({
    description: 'if equals "get" should bring the cars related to the brand.',
  })
  @IsString()
  @IsOptional()
  readonly cars?: string;

  @ApiProperty({
    description: 'if equals "get" should bring the model related to the brand.',
  })
  @IsString()
  @IsOptional()
  readonly models?: string;
}
