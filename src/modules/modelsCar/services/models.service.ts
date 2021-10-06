import { ParamsModelDto } from './../dto/params-model.dto';
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

  async create({ name, brandName }: CreateModelDto) {
    return this.modelRepository.create({ name, brandName });
  }

  findAll() {
    return this.modelRepository.findAll();
  }

  async update(paramsModelDto: ParamsModelDto, updateModelDto: UpdateModelDto) {
    return this.modelRepository.updateByBrandAndModel(
      paramsModelDto,
      updateModelDto,
    );
  }

  async remove(paramsModelDto: ParamsModelDto) {
    return this.modelRepository.deleteByBrandAndModel(paramsModelDto);
  }
}
