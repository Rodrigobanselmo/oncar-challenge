import { IncludesQueryDto } from '../dto/includes-query-car.dto';
import { FilterQueryDto } from '../dto/filter-query.dto-car';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CarsService } from '../services/cars.service';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { CarEntity } from '../entities/car.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return new CarEntity(await this.carsService.create(createCarDto));
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query() filterQueryDto: FilterQueryDto,
    @Query() includesQueryDto: IncludesQueryDto,
  ) {
    return this.carsService.findAll(
      paginationQuery,
      filterQueryDto,
      includesQueryDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
