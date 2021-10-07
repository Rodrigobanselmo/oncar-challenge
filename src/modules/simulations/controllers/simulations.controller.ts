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
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';

import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { FilterQuerySimulationDto } from '../dto/filter-query-simulation.dto';
import { SimulationEntity } from '../entities/simulation.entity';
import { SimulationsService } from '../services/simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post()
  async create(@Body() createSimulationDto: CreateSimulationDto) {
    return new SimulationEntity(
      await this.simulationsService.create(createSimulationDto),
    );
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query() filterQuerySimulationDto: FilterQuerySimulationDto,
  ) {
    const allSimulations = await this.simulationsService.findAll(
      paginationQuery,
      filterQuerySimulationDto,
    );

    return allSimulations.map((simulation) => new SimulationEntity(simulation));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new SimulationEntity(await this.simulationsService.findOne(+id));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new SimulationEntity(await this.simulationsService.remove(+id));
  }
}
