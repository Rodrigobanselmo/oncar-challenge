import { ApiProperty } from '@nestjs/swagger';

import { AddressEntity } from './address.entity';
import { Simulations } from '.prisma/client';

export class SimulationEntity implements Simulations {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  income: number;

  @ApiProperty()
  haveHelp: boolean;

  @ApiProperty()
  carValue: number;

  @ApiProperty()
  initPayment: number;

  @ApiProperty()
  dirtyName: boolean;

  @ApiProperty()
  score: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  address?: AddressEntity;

  constructor(partial: Partial<SimulationEntity>) {
    Object.assign(this, partial);
  }
}
