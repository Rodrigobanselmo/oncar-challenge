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
    try {
      return await this.prisma.brand.create({
        data: { name },
      });
    } catch (e) {
      if (e.code === 'P2002')
        throw new BadRequestException(`Brand with name ${name} already exists`);
      throw new Error(e);
    }
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
      include: { cars, models },
    });
  }

  async deleteByName(name: string): Promise<Prisma.Prisma__BrandClient<Brand>> {
    try {
      return await this.prisma.brand.delete({ where: { name } });
    } catch (e) {
      console.log(`e`, e);
      if (e.code === 'P2025') throw new BadRequestException(`Brand not found`);
      throw new Error(e);
    }
  }
}

// : cars
//           ? {
//               take: 10,
//             }
//           : false,
