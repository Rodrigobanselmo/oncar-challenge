import { Brand } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BrandEntity implements Brand {
  @ApiProperty()
  id: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  created_at: Date;

  constructor(partial: Partial<BrandEntity>) {
    Object.assign(this, partial);
  }
}
