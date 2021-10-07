import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { FakerCar } from '../../../../test/fake/car.fake';
import { BrandRepository } from '../../../modules/brandCar/repositories/BrandRepository';
import { ModelRepository } from '../../../modules/modelCar/repositories/ModelRepository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CarsRepository } from '../repositories/CarsRepository';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        PrismaService,
        CarsRepository,
        ModelRepository,
        BrandRepository,
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Car', () => {
    it('should create and return the Car', async () => {
      const creationCar = new FakerCar();

      const car = await service.create(creationCar);
      expect(car).toHaveProperty('id', car.id);
    });

    it('should not create if Car plate already exists', async () => {
      const creationCar = new FakerCar();

      await service.create(creationCar);
      try {
        await service.create(creationCar);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
