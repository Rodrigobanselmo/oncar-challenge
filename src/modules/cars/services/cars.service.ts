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

  async create(createCarDto: CreateCarDto) {
    const existingCar = await this.carsRepository.findByPlate(
      createCarDto.plate,
    );

    if (existingCar)
      throw new BadRequestException(
        `Car with plate "${createCarDto.plate}" already exists`,
      );

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

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carsRepository.findById(id);

    if (!car) throw new NotFoundException('Car not found');

    return this.carsRepository.update(id, updateCarDto);
  }

  async remove(id: number) {
    const car = await this.carsRepository.findById(id);

    if (!car) throw new NotFoundException('Car not found');

    return this.carsRepository.deleteById(id);
  }
}
