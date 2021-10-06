import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCarDto } from '../dto/create-car.dto';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { CarsRepository } from '../repositories/CarsRepository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  create(createCarDto: CreateCarDto) {
    return this.carsRepository.create(createCarDto);
  }

  findAll(paginationQueryDto: PaginationQueryDto) {
    return this.carsRepository.findAll(paginationQueryDto);
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
