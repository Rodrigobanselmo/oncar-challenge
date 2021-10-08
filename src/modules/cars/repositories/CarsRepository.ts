import { Injectable } from '@nestjs/common';

import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import { FilterQueryDto } from '../dto/filter-query.dto-car';
import { IncludesQueryDto } from '../dto/includes-query-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { PrismaService } from './../../../prisma/prisma.service';
import { CreateCarDto } from './../dto/create-car.dto';
import { ICarsRepository } from './ICarsRepository';
import { Car, Prisma } from '.prisma/client';

@Injectable()
export class CarsRepository implements ICarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ brandName, modelName, ...restCreateCarDto }: CreateCarDto) {
    return await this.prisma.car.create({
      data: {
        ...restCreateCarDto,
        model: {
          connectOrCreate: {
            create: {
              name: modelName,
              brand: {
                connectOrCreate: {
                  create: {
                    name: brandName,
                  },
                  where: {
                    name: brandName,
                  },
                },
              },
            },
            where: {
              Model_model_brand_key: {
                name: modelName,
                brandName,
              },
            },
          },
        },
        brand: {
          connectOrCreate: {
            create: {
              name: brandName,
            },
            where: {
              name: brandName,
            },
          },
        },
      },
    });
  }

  async update(
    id: number,
    { brandName, modelName, ...restUpdateCarDto }: UpdateCarDto,
  ): Promise<Car> {
    return await this.prisma.car.update({
      where: { id: id },
      data: {
        ...restUpdateCarDto,
        model:
          !modelName || !brandName
            ? undefined
            : {
                connectOrCreate: {
                  create: {
                    name: modelName,
                    brand: {
                      connectOrCreate: {
                        create: {
                          name: brandName,
                        },
                        where: {
                          name: brandName,
                        },
                      },
                    },
                  },
                  where: {
                    Model_model_brand_key: {
                      name: modelName,
                      brandName,
                    },
                  },
                },
              },
        brand:
          !modelName || !brandName
            ? undefined
            : {
                connectOrCreate: {
                  create: {
                    name: brandName,
                  },
                  where: {
                    name: brandName,
                  },
                },
              },
      },
    });
  }

  findAll(
    paginationQuery: PaginationQueryDto,
    filterQueryDto: FilterQueryDto,
    includesQueryDto: IncludesQueryDto,
  ): Promise<[Car[], number]> {
    const { limit = 10, offset = 0 } = paginationQuery;
    const { brandName, modelName, maxPrice, minPrice } = filterQueryDto;
    const { brand, model } = includesQueryDto;

    return this.prisma.$transaction([
      this.prisma.car.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        where: {
          brandName: {
            equals: brandName,
          },
          modelName: {
            equals: modelName,
          },
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
        include: {
          brand: brand === 'get' ? true : false,
          model: model === 'get' ? true : false,
        },
      }),
      this.prisma.car.count(),
    ]);
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
    return await this.prisma.car.delete({ where: { id } });
  }
}
