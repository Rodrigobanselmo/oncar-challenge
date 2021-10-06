import { IncludesQueryDto } from './../dto/includes-query.dto';
import { ModelRepository } from './../../modelsCar/repositories/ModelRepository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCarDto } from '../dto/create-car.dto';
import { FilterQueryDto } from '../dto/filter-query.dto';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { CarsRepository } from '../repositories/CarsRepository';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepository: CarsRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async create({ brandId, modelId, ...rest }: CreateCarDto) {
    // i don`t think here has the need os transactions to avoid concurrency issues,
    // if something goes wrong will just send an error message
    const model = await this.modelRepository.findById(modelId);

    if (model.brandId !== brandId) {
      throw new BadRequestException('The model needs to be part of the brand');
    }

    return this.carsRepository.create({ modelId, brandId, ...rest });
  }

  findAll(
    paginationQueryDto: PaginationQueryDto,
    filterQueryDto: FilterQueryDto,
    includesQueryDto: IncludesQueryDto,
  ) {
    return this.carsRepository.findAll(
      paginationQueryDto,
      filterQueryDto,
      includesQueryDto,
    );
  }

  async findOne(id: number) {
    const car = await this.carsRepository.findById(id);

    if (!car) throw new NotFoundException('Car not found');

    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.carsRepository.update(id, updateCarDto);

    // const car = await this.carsRepository.findById(id);

    // if (!car) throw new NotFoundException('Car not found');

    // return this.carsRepository.update(id, updateCarDto);
  }

  remove(id: number) {
    return this.carsRepository.deleteById(id);

    // const car = await this.carsRepository.findById(id);

    // if (!car) throw new NotFoundException('Car not found');

    // return this.carsRepository.deleteById(id);
  }
}
