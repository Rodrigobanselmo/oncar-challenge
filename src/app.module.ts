import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { CarsModule } from './modules/cars/cars.module';
import { BrandModule } from './modules/brandCar/brand.module';
import { ModelsModule } from './modules/modelCar/models.module';
import { SimulationsModule } from './modules/simulations/simulations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CarsModule,
    BrandModule,
    ModelsModule,
    SimulationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
