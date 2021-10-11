import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { SimulationsRepository } from '../repositories/SimulationsRepository';
import { FilterQuerySimulationDto } from './../dto/filter-query-simulation.dto';

@Injectable()
export class SimulationsService {
  constructor(private readonly simulationsRepository: SimulationsRepository) {}

  async create(createSimulationDto: CreateSimulationDto) {
    const score = this.random(1, 999);

    function getMessage() {
      if (score <= 299) return 'Reprovado';
      if (score <= 599)
        return '70% de entrada, 30% do comprometimento da renda';
      if (score <= 799)
        return '50% de entrada, 25% do comprometimento da renda';
      if (score <= 950)
        return '30% de entrada, 20% do comprometimento da renda';
      if (score <= 999) return '100% de financiamento, taxa zero.';
    }

    const simulation = await this.simulationsRepository.create(
      createSimulationDto,
      score,
    );

    return { ...simulation, message: getMessage() };
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
