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
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { FilterQuerySimulationDto } from '../dto/filter-query-simulation.dto';
import { SimulationsService } from '../services/simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post()
  create(@Body() createSimulationDto: CreateSimulationDto) {
    return this.simulationsService.create(createSimulationDto);
  }

  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query() filterQuerySimulationDto: FilterQuerySimulationDto,
  ) {
    return this.simulationsService.findAll(
      paginationQuery,
      filterQuerySimulationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.simulationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.simulationsService.remove(+id);
  }
}
