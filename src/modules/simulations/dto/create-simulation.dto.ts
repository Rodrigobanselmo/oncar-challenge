import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsString,
  Length,
  MaxDate,
  Min,
  MinDate,
  ValidateNested,
} from 'class-validator';

import { CreateSimulationAddressDto } from './create-simulation-address.dto';
import { Simulations } from '.prisma/client';
import { PhoneFormatTransform } from '../../../shared/transformers/phone-format.transform';
import { CpfFormatTransform } from '../../../shared/transformers/cpf-format.transform';

export class CreateSimulationDto
  implements Omit<Simulations, 'id' | 'created_at' | 'score'>
{
  @ApiProperty({ description: 'person name.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'person cpf.' })
  // @Transform(keepOnlyNumberTransform, { toClassOnly: true })
  @Transform(CpfFormatTransform, { toClassOnly: true })
  @IsString()
  @Length(11)
  cpf: string;

  @ApiProperty({ description: 'person phone number.' })
  @Transform(PhoneFormatTransform, { toClassOnly: true })
  @IsString()
  @Length(14)
  phone: string;

  @ApiProperty({ description: 'person birth date.' })
  @IsDate()
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 150)))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
  birthDate: Date;

  @ApiProperty({ description: 'person email.' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'monthly income money.' })
  @IsInt()
  @Min(0)
  income: number;

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
