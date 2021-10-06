import { ApiProperty } from '@nestjs/swagger';
import { Address, Simulations } from '.prisma/client';

export class SimulationEntity implements Simulations {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: number;

  @ApiProperty()
  phone: number;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  email: number;

  @ApiProperty()
  income: number;

  @ApiProperty()
  haveHelp: boolean;

  @ApiProperty()
  dirtyName: boolean;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  address?: Address;

  constructor(partial: Partial<SimulationEntity>) {
    Object.assign(this, partial);
  }
}
