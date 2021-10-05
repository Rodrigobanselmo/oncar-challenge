import { Injectable } from '@nestjs/common';

import { UpdateBrandDto } from '../dto/update-brand.dto';
import { PrismaService } from './../../../prisma/prisma.service';
import { CreateBrandDto } from './../dto/create-brand.dto';
import { IBrandRepository } from './IBrandRepository';
import { Brand } from '.prisma/client';

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

  findById(id: number): Promise<Brand> {
    return this.prisma.brand.findUnique({ where: { id } });
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.brand.delete({ where: { id } });
  }
}
