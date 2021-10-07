import { ApiProperty } from '@nestjs/swagger';
import { CarEntity } from '../../../modules/cars/entities/car.entity';
import { ModelEntity } from '../../../modules/modelCar/entities/model.entity';

import { Brand } from '.prisma/client';

export class BrandEntity implements Brand {
  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  models?: ModelEntity[];

  @ApiProperty()
  cars?: CarEntity[];

  constructor(partial: Partial<BrandEntity>) {
    Object.assign(this, partial);
  }
}
