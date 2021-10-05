import { Injectable } from '@nestjs/common';

import { UpdateBrandDto } from '../dto/update-brand.dto';
import { PrismaService } from './../../../prisma/prisma.service';
import { CreateBrandDto } from './../dto/create-brand.dto';
import { IBrandRepository } from './IBrandRepository';
import { Brand, Prisma } from '.prisma/client';
import { FindOptionsBrandDto } from '../dto/find-options-brand.dto';

@Injectable()
export class BrandRepository implements IBrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    return this.prisma.brand.update({
      where: { id: id },
      data: updateBrandDto,
    });
  }

  findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany();
  }

  findById(
    id: number,
    findOptionsBrandDto: FindOptionsBrandDto = { cars: false, models: false },
  ): Promise<Brand> {
    const { cars, models } = findOptionsBrandDto;

    return this.prisma.brand.findUnique({
      where: { id },
      include: { cars, models },
    });
  }

  findByBrand(brand: string): Promise<Brand> {
    return this.prisma.brand.findUnique({ where: { brand } });
  }

  async deleteById(id: number): Promise<Prisma.Prisma__BrandClient<Brand>> {
    return this.prisma.brand.delete({ where: { id } });
  }
}

// : cars
//           ? {
//               take: 10,
//             }
//           : false,
