import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBrandDto } from '../dto/create-brand.dto';
import { IncludesQueryBrandDto } from '../dto/includes-query-brand.dto';
import { BrandRepository } from '../repositories/BrandRepository';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrandDto: CreateBrandDto) {
    return this.brandRepository.create(createBrandDto);
  }

  findAll() {
    return this.brandRepository.findAll();
  }

  async findOne(name: string, includesQueryBrandDto: IncludesQueryBrandDto) {
    const brand = await this.brandRepository.findByName(
      name,
      includesQueryBrandDto,
    );

    if (!brand) throw new NotFoundException('Brand not found');

    return brand;
  }

  async remove(name: string) {
    return this.brandRepository.deleteByName(name);
  }
}
