import { IsOptional, IsPositive } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  @IsPositive()
  brandId: number;

  @IsOptional()
  @IsPositive()
  modelId: number;
}
