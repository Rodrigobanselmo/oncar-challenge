import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SimulationsService } from '../services/simulations.service';
import { CreateSimulationDto } from '../dto/create-simulation.dto';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post()
  create(@Body() createSimulationDto: CreateSimulationDto) {
    return this.simulationsService.create(createSimulationDto);
  }

  @Get()
  findAll() {
    return this.simulationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simulationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulationsService.remove(+id);
  }
}
