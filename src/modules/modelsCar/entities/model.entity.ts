import { Model } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ModelEntity implements Model {
  @ApiProperty()
  id: number;

  @ApiProperty()
  model: string;

  @ApiProperty()
  num_requests: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  brandId: number;

  constructor(partial: Partial<ModelEntity>) {
    Object.assign(this, partial);
  }
}
