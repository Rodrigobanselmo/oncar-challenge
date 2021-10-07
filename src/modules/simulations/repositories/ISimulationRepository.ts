import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { FilterQuerySimulationDto } from '../dto/filter-query-simulation.dto';
import { Prisma, Simulations } from '.prisma/client';

interface ISimulationsRepository {
  create(createCarDto: CreateSimulationDto): Promise<Simulations>;
  findAll(
    paginationQuery: PaginationQueryDto,
    filterQueryDto: FilterQuerySimulationDto,
  ): Promise<Simulations[]>;
  findById(id: number): Promise<Simulations | undefined>;
  deleteById(
    id: number,
  ): Promise<Prisma.Prisma__SimulationsClient<Simulations>>;
}
export { ISimulationsRepository };
