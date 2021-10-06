import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from './../../../prisma/prisma.service';
import { CreateBrandDto } from './../dto/create-brand.dto';
import { IBrandRepository } from './IBrandRepository';
import { Brand, Prisma } from '.prisma/client';
import { IncludesQueryBrandDto } from '../dto/includes-query-brand.dto';

@Injectable()
export class BrandRepository implements IBrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: CreateBrandDto) {
    return await this.prisma.brand.create({
      data: { name },
    });
  }

  findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany();
  }

  findByName(
    name: string,
    includesQueryBrandDto: IncludesQueryBrandDto,
  ): Promise<Brand> {
    const { cars, models } = includesQueryBrandDto;

    return this.prisma.brand.findUnique({
      where: { name },
      include: {
        cars: cars === 'get' ? true : false,
        models: models === 'get' ? true : false,
      },
    });
  }

  async deleteByName(name: string): Promise<Prisma.Prisma__BrandClient<Brand>> {
    return await this.prisma.brand.delete({ where: { name } });
  }
}
