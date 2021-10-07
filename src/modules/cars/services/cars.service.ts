import { IncludesQueryDto } from '../dto/includes-query-car.dto';
import { ModelRepository } from '../../modelCar/repositories/ModelRepository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCarDto } from '../dto/create-car.dto';
import { FilterQueryDto } from '../dto/filter-query.dto-car';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { CarsRepository } from '../repositories/CarsRepository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async create(createCarDto: CreateCarDto) {
    return this.carsRepository.create(createCarDto);
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
  }

  remove(id: number) {
    return this.carsRepository.deleteById(id);
  }
}
