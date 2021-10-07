import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { SimulationsRepository } from '../repositories/SimulationsRepository';
import { FilterQuerySimulationDto } from './../dto/filter-query-simulation.dto';

@Injectable()
export class SimulationsService {
  constructor(private readonly simulationsRepository: SimulationsRepository) {}

  create(createSimulationDto: CreateSimulationDto) {
    const score = this.random(1, 999);
    return this.simulationsRepository.create(createSimulationDto, score);
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

  random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
}
