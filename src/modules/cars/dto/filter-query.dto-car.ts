import { IsOptional, IsString } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  @IsString()
  brandName: string;

  @IsOptional()
  @IsString()
  modelName: string;
}
