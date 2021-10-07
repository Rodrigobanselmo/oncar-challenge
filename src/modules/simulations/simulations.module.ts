import { Module } from '@nestjs/common';

import { SimulationsController } from './controllers/simulations.controller';
import { SimulationsRepository } from './repositories/SimulationsRepository';
import { SimulationsService } from './services/simulations.service';

@Module({
  controllers: [SimulationsController],
  providers: [SimulationsService, SimulationsRepository],
})
export class SimulationsModule {}
