import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsPositive, Max } from 'class-validator';

import { dateTransform } from '../../../shared/transformers/date.transform';

export class FilterQuerySimulationDto {
  @ApiProperty({
    example: '2020/3/22',
    description: 'get all dates after the filter date with format YYYY-MM-DD',
  })
  @IsOptional()
  @IsDate()
  @Transform(dateTransform, { toClassOnly: true })
  greaterThanDate: string;

  @ApiProperty({
    example: '2020/3/22',
    description: 'get all dates before the filter date with format YYYY-MM-DD',
  })
  @IsOptional()
  @IsDate()
  @Transform(dateTransform, { toClassOnly: true })
  lowerThanDate: string;

  @ApiProperty({
    description: 'get scores that are grater than the filter value',
  })
  @IsOptional()
  @Max(999)
  @IsPositive()
  @IsInt()
  greaterThanScore: number;

  @ApiProperty({
    description: 'get scores that are smaller than the filter value',
  })
  @IsOptional()
  @Max(999)
  @IsPositive()
  @IsInt()
  lowerThanScore: number;
}
