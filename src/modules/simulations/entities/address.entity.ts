import { ApiProperty } from '@nestjs/swagger';

import { Address } from '.prisma/client';

export class AddressEntity implements Address {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  simulationId: number;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
