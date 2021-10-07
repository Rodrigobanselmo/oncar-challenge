import { Injectable } from '@nestjs/common';
import { CreateSimulationDto } from '../dto/create-simulation.dto';

@Injectable()
export class SimulationsService {
  create(createSimulationDto: CreateSimulationDto) {
    return 'This action adds a new simulation';
  }

  findAll() {
    return `This action returns all simulations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} simulation`;
  }

  remove(id: number) {
    return `This action removes a #${id} simulation`;
  }
}
