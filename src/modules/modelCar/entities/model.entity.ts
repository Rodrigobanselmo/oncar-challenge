import { Model } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ModelEntity implements Model {
  @ApiProperty()
  name: string;

  @ApiProperty()
  num_requests: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  brandName: string;

  constructor(partial: Partial<ModelEntity>) {
    Object.assign(this, partial);
  }
}
