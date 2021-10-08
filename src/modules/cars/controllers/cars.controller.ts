import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import { CreateCarDto } from '../dto/create-car.dto';
import { FilterQueryDto } from '../dto/filter-query.dto-car';
import { IncludesQueryDto } from '../dto/includes-query-car.dto';
import { CarEntity } from '../entities/car.entity';
import { CarsService } from '../services/cars.service';

@ApiTags('Cars')
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
    @Res() resp: Response,
  ) {
    const [allCars, totalCars] = await this.carsService.findAll(
      paginationQuery,
      filterQueryDto,
      includesQueryDto,
    );
    return resp
      .header('totalCount', totalCars.toString())
      .json(allCars.map((car) => new CarEntity(car)));
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
