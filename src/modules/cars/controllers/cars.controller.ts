import { IncludesQueryDto } from '../dto/includes-query-car.dto';
import { FilterQueryDto } from '../dto/filter-query.dto-car';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CarsService } from '../services/cars.service';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { CarEntity } from '../entities/car.entity';
import { ValidatePayloadExistsPipe } from 'src/shared/pipes/validates-payload-exists.pipe';

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
    const allCars = await this.carsService.findAll(
      paginationQuery,
      filterQueryDto,
      includesQueryDto,
    );
    allCars.map((car) => new CarEntity(car));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new CarEntity(await this.carsService.findOne(+id));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new CarEntity(await this.carsService.remove(+id));
  }

  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidatePayloadExistsPipe) updateCarDto: UpdateCarDto,
  // ) {
  //   return new CarEntity(await this.carsService.update(+id, updateCarDto));
  // }
}
