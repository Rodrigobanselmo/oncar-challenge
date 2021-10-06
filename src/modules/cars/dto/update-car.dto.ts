import { IsString, ValidateIf } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';

// type UpdateCarModelDto = Omit<CreateCarDto, 'brandName' | 'modelName'>;

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiProperty({ description: 'car model name.' })
  @ValidateIf((o) => o.brandName)
  @IsString()
  readonly modelName: string;

  @ApiProperty({ description: 'car brand name.' })
  @ValidateIf((o) => o.modelName)
  @IsString()
  readonly brandName: string;
}
