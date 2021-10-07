import { ModelRepository } from '../modelCar/repositories/ModelRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { CarsController } from './controllers/cars.controller';
import { CarsRepository } from './repositories/CarsRepository';
import { CarsService } from './services/cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, PrismaService, ModelRepository, CarsRepository],
})
export class CarsModule {}
