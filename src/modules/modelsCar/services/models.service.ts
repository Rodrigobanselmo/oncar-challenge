import { Injectable } from '@nestjs/common';

import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { ParamsModelDto } from './../dto/params-model.dto';
import { ModelRepository } from './../repositories/ModelRepository';

@Injectable()
export class ModelsService {
  constructor(private readonly modelRepository: ModelRepository) {}

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
