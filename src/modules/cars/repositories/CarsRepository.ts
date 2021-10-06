import { CreateCarDto } from './../dto/create-car.dto';
import { Injectable } from '@nestjs/common';

import { PrismaService } from './../../../prisma/prisma.service';
import { Car, Prisma } from '.prisma/client';
import { ICarsRepository } from './ICarsRepository';
import { UpdateCarDto } from '../dto/update-car.dto';
import { PaginationQueryDto } from 'src/modules/cars/dto/pagination-query.dto';

@Injectable()
export class CarsRepository implements ICarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: createCarDto,
    });
  }

  update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    return this.prisma.car.update({
      where: { id: id },
      data: updateCarDto,
    });
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Car[]> {
    const { limit = 10, offset = 0 } = paginationQuery;
    return this.prisma.car.findMany({
      skip: offset,
      take: limit,
      // where: {
      //   brand: { id: {equals: }},
      // },
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
    return this.prisma.car.delete({ where: { id } });
  }
}
