import { IsDate, IsInt, IsOptional } from 'class-validator';

export class FilterQuerySimulationDto {
  @IsOptional()
  @IsDate()
  greaterThanDate: Date;

  @IsOptional()
  @IsDate()
  lowerThanDate: Date;

  @IsOptional()
  @IsInt()
  greaterThanScore: number;

  @IsOptional()
  @IsInt()
  lowerThanScore: number;
}
