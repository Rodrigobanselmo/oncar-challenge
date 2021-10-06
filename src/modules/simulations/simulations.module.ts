import { Module } from '@nestjs/common';
import { SimulationsService } from './services/simulations.service';
import { SimulationsController } from './controllers/simulations.controller';

@Module({
  controllers: [SimulationsController],
  providers: [SimulationsService],
})
export class SimulationsModule {}
