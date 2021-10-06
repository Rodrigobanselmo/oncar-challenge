import { IncludesQueryDto } from './../dto/includes-query.dto';
import { CreateCarDto } from './../dto/create-car.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from './../../../prisma/prisma.service';
import { Car, Prisma } from '.prisma/client';
import { ICarsRepository } from './ICarsRepository';
import { UpdateCarDto } from '../dto/update-car.dto';
import { PaginationQueryDto } from 'src/modules/cars/dto/pagination-query.dto';
import { FilterQueryDto } from '../dto/filter-query.dto';

@Injectable()
export class CarsRepository implements ICarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarDto: CreateCarDto) {
    try {
      return await this.prisma.car.create({
        data: createCarDto,
      });
    } catch (e) {
      if (e.code === 'P2003')
        throw new BadRequestException(`Model or brand does not exists`);
      if (e.code === 'P2002')
        throw new BadRequestException(
          `Car with plate ${createCarDto.plate} already exists`,
        );
      throw new Error(e);
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      return await this.prisma.car.update({
        where: { id: id },
        data: updateCarDto,
      });
    } catch (e) {
      if (e.code === 'P2025') throw new BadRequestException(`Car not found`);
      throw new Error(e);
    }
  }

  findAll(
    paginationQuery: PaginationQueryDto,
    filterQueryDto: FilterQueryDto,
    includesQueryDto: IncludesQueryDto,
  ): Promise<Car[]> {
    const { limit = 10, offset = 0 } = paginationQuery;
    const { brandId, modelId } = filterQueryDto;
    const { brand, model } = includesQueryDto;

    return this.prisma.car.findMany({
      skip: offset,
      take: limit,
      where: {
        brandId: {
          equals: brandId,
        },
        modelId: {
          equals: modelId,
        },
      },
      include: {
        brand: brand === 'get' ? true : false,
        model: model === 'get' ? true : false,
      },
    });
  }

  findById(id: number): Promise<Car> {
    return this.prisma.car.findUnique({
      where: { id },
      include: {
        brand: true,
        model: true,
      },
    });
  }

  findByPlate(plate: string): Promise<Car> {
    return this.prisma.car.findUnique({ where: { plate } });
  }

  async deleteById(id: number): Promise<Prisma.Prisma__CarClient<Car>> {
    try {
      return await this.prisma.car.delete({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') throw new BadRequestException(`Car not found`);
      throw new Error(e);
    }
  }
}
