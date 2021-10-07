import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxDate,
  Min,
  MinDate,
} from 'class-validator';

import { Address, Simulations } from '.prisma/client';

export class CreateSimulationDto
  implements Omit<Simulations, 'id' | 'created_at'>
{
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Length(14)
  cpf: number;

  @ApiProperty()
  @IsInt()
  @Length(10, 11)
  phone: number;

  @ApiProperty()
  @IsString()
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 150)))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  income: number;

  @ApiProperty()
  @IsBoolean()
  haveHelp: boolean;

  @ApiProperty()
  @IsBoolean()
  dirtyName: boolean;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(999)
  score: number;

  @ApiProperty()
  address?: Address;
}
