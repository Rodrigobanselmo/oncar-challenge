import { ApiProperty } from '@nestjs/swagger';

import { Car } from '.prisma/client';

export class CarEntity implements Car {
  @ApiProperty()
  id: number;

  @ApiProperty()
  plate: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  year: string;

  @ApiProperty()
  kilometers: number;

  @ApiProperty()
  fuel: string;

  @ApiProperty({ required: false, nullable: true })
  desc: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  modelName: string;

  @ApiProperty()
  brandName: string;

  constructor(partial: Partial<CarEntity>) {
    Object.assign(this, partial);
  }
}
