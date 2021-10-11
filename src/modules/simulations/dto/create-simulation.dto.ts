import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsString,
  Length,
  Max,
  MaxDate,
  Min,
  MinDate,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { CpfFormatTransform } from '../../../shared/transformers/cpf-format.transform';
import { PhoneFormatTransform } from '../../../shared/transformers/phone-format.transform';
import { CreateSimulationAddressDto } from './create-simulation-address.dto';
import { Simulations } from '.prisma/client';

export class CreateSimulationDto
  implements Omit<Simulations, 'id' | 'created_at' | 'score'>
{
  @ApiProperty({ description: 'person name.' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'person cpf.' })
  // @Transform(keepOnlyNumberTransform, { toClassOnly: true })
  @Transform(CpfFormatTransform, { toClassOnly: true })
  @IsString()
  @Length(14, 14)
  cpf: string;

  @ApiProperty({ description: 'person phone number.' })
  @Transform(PhoneFormatTransform, { toClassOnly: true })
  @IsString()
  @Length(14, 15)
  phone: string;

  @ApiProperty({ description: 'person birth date.' })
  @IsDate()
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 150)))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
  birthDate: Date;

  @ApiProperty({ description: 'person email.' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'monthly income money.' })
  @IsInt()
  @Min(0)
  @Max(1000000000) // 10ˆ9
  income: number;

  @ApiProperty({ description: 'car price.' })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Max(1000000000) // 10ˆ9
  carValue: number;

  @ApiProperty({ description: 'initial payment.' })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Max(1000000000) // 10ˆ9
  initPayment: number;

  @ApiProperty({ description: 'if person will have help.' })
  @IsBoolean()
  haveHelp: boolean;

  @ApiProperty({ description: 'if person has dirty name.' })
  @IsBoolean()
  dirtyName: boolean;

  @ApiProperty({ description: 'address validation.' })
  @ValidateNested()
  address: CreateSimulationAddressDto;
}
