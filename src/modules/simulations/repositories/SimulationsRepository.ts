import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { FilterQuerySimulationDto } from '../dto/filter-query-simulation.dto';
import { ISimulationsRepository } from './ISimulationRepository';
import { Prisma, Simulations } from '.prisma/client';

@Injectable()
export class SimulationsRepository implements ISimulationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    address,
    ...createCarDto
  }: CreateSimulationDto): Promise<Simulations> {
    return await this.prisma.simulations.create({
      data: {
        ...createCarDto,
        address: {
          create: address,
        },
      },
    });
  }

  findAll(
    paginationQuery: PaginationQueryDto,
    filterQuerySimulationDto: FilterQuerySimulationDto,
  ): Promise<Simulations[]> {
    const { limit = 10, offset = 0 } = paginationQuery;
    const { lowerThanDate, greaterThanDate, greaterThanScore, lowerThanScore } =
      filterQuerySimulationDto;

    return this.prisma.simulations.findMany({
      skip: offset,
      take: limit,
      where: {
        score: {
          gte: greaterThanScore,
          lte: lowerThanScore,
        },
        created_at: {
          gte: greaterThanDate,
          lte: lowerThanDate,
        },
      },
    });
  }

  findById(id: number): Promise<Simulations> {
    return this.prisma.simulations.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });
  }

  async deleteById(
    id: number,
  ): Promise<Prisma.Prisma__SimulationsClient<Simulations>> {
    return await this.prisma.simulations.delete({ where: { id } });
  }
}
