import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindOptionsBrandDto {
  @ApiProperty({
    description: 'if true should bring all cars related to the brand.',
  })
  @IsBoolean()
  @IsOptional()
  readonly cars: boolean;

  @ApiProperty({
    description: 'if true should bring all models related to the brand.',
  })
  @IsBoolean()
  @IsOptional()
  readonly models: boolean;
}
