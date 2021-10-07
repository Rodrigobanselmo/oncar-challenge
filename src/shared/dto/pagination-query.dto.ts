import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  @Max(100000000)
  offset?: number = 0;
}
