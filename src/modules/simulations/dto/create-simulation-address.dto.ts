import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsString,
  IsUppercase,
  Length,
  MaxLength,
} from 'class-validator';

import { Address } from '.prisma/client';

export class CreateSimulationAddressDto
  implements Omit<Address, 'id' | 'simulationId'>
{
  @ApiProperty({ description: 'address number.' })
  @IsPositive()
  @MaxLength(6)
  number: number;

  @ApiProperty({ description: 'address cep.' })
  @Length(8)
  cep: number;

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
  @IsString()
  @MaxLength(2)
  @IsUppercase()
  estate: string;
}
