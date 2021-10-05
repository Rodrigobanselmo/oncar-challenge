import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateBrandDto } from '../dto/create-brand.dto';
import { FindOptionsBrandDto } from '../dto/find-options-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandRepository } from '../repositories/BrandRepository';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create({ brand }: CreateBrandDto) {
    const existingBrand = await this.brandRepository.findByBrand(brand);

    if (existingBrand) throw new BadRequestException('Brand already exists');

    return this.brandRepository.create({ brand });
  }

  findAll() {
    return this.brandRepository.findAll();
  }

  async findOne(id: number, findOptionsBrandDto: FindOptionsBrandDto) {
    const brand = await this.brandRepository.findById(id, findOptionsBrandDto);

    if (!brand) throw new NotFoundException('Brand not found');

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.findById(id);

    if (!brand) throw new NotFoundException('Brand not found');

    return this.brandRepository.update(id, updateBrandDto);
  }

  async remove(id: number) {
    const brandDeleted = await this.brandRepository.deleteById(id);

    if (!brandDeleted) throw new NotFoundException('Brand not found');
    return this.brandRepository.deleteById(id);
  }
}
