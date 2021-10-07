import { Test, TestingModule } from '@nestjs/testing';
import { SimulationsController } from './simulations.controller';
import { SimulationsService } from '../services/simulations.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { SimulationsRepository } from '../repositories/SimulationsRepository';

describe('SimulationsController', () => {
  let controller: SimulationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationsController],
      providers: [SimulationsService, PrismaService, SimulationsRepository],
    }).compile();

    controller = module.get<SimulationsController>(SimulationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
