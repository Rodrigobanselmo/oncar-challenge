import { ModelRepository } from './../repositories/ModelRepository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandRepository } from 'src/modules/brand/repositories/BrandRepository';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async create({ model, brandId }: CreateModelDto) {
    const existingBrand = await this.brandRepository.findById(brandId);
    if (!existingBrand) throw new BadRequestException('Brand does not exists');

    const existingModel = await this.modelRepository.findByBrandIdAndModel(
      brandId,
      model,
    );
    if (existingModel) throw new BadRequestException('Model already exists');

    return this.modelRepository.create({ model, brandId });
  }

  findAll() {
    return this.modelRepository.findAll();
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const model = await this.modelRepository.findById(id);

    if (!model) throw new NotFoundException('Model not found');

    return this.modelRepository.update(id, updateModelDto);
  }

  async remove(id: number) {
    const modelDeleted = await this.modelRepository.findById(id);

    if (!modelDeleted) throw new NotFoundException('Model not found');
    return this.modelRepository.deleteById(id);
  }
}
