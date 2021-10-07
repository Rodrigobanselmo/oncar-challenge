import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsPositive,
  IsString,
  IsUppercase,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { CepFormatTransform } from './../../../shared/transformers/cep-format.transform';
import { StringUppercaseTransform } from '../../../shared/transformers/string-uppercase.transform';
import { Address } from '.prisma/client';

export class CreateSimulationAddressDto
  implements Omit<Address, 'id' | 'simulationId'>
{
  @ApiProperty({ description: 'address number.' })
  @IsPositive()
  @Max(9999999)
  number: number;

  @ApiProperty({ description: 'address cep.' })
  @Transform(CepFormatTransform, { toClassOnly: true })
  @Length(9, 9)
  cep: string;

  @ApiProperty({ description: 'address street.' })
  @IsString()
  @MaxLength(50)
  street: string;

  @ApiProperty({ description: 'address complement.' })
  @IsString()
  @MaxLength(50)
  complement: string;

  @ApiProperty({ description: 'address neighbour.' })
  @MaxLength(50)
  @IsString()
  neighborhood: string;

  @ApiProperty({ description: 'address city.' })
  @IsString()
  @MaxLength(30)
  city: string;

  @ApiProperty({ description: 'address estate.' })
  @Transform(StringUppercaseTransform, { toClassOnly: true })
  @IsString()
  @Length(2, 2)
  @IsUppercase()
  estate: string;
}
