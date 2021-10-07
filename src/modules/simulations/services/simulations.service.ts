import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { SimulationsRepository } from '../repositories/SimulationsRepository';
import { FilterQuerySimulationDto } from './../dto/filter-query-simulation.dto';

@Injectable()
export class SimulationsService {
  constructor(private readonly simulationsRepository: SimulationsRepository) {}

  create(createSimulationDto: CreateSimulationDto) {
    return this.simulationsRepository.create(createSimulationDto);
  }

  findAll(
    paginationQueryDto: PaginationQueryDto,
    filterQuerySimulationDto: FilterQuerySimulationDto,
  ) {
    return this.simulationsRepository.findAll(
      paginationQueryDto,
      filterQuerySimulationDto,
    );
  }

  async findOne(id: number) {
    const simulation = await this.simulationsRepository.findById(id);

    if (!simulation) throw new NotFoundException('Simulation not found');

    return simulation;
  }

  remove(id: number) {
    return this.simulationsRepository.deleteById(id);
  }
}
