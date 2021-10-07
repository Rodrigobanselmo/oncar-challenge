import { Test, TestingModule } from '@nestjs/testing';

import { FakerCar } from '../../../../test/fake/car.fake';
import { PrismaService } from '../../../prisma/prisma.service';
import { CarEntity } from '../entities/car.entity';
import { CarsRepository } from '../repositories/CarsRepository';
import { CarsService } from '../services/cars.service';
import { CarsController } from './cars.controller';

describe('CarsController', () => {
  let controller: CarsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService, PrismaService, CarsRepository],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Car', () => {
    it('should create and return the Car Entity', async () => {
      const creationCar = new FakerCar();
      const car = await controller.create(creationCar);
      expect(car).toBeInstanceOf(CarEntity);
      expect(car).toHaveProperty('id');
    });
  });

  describe('findOne Car', () => {
    it('should find by name and return one car Entity', async () => {
      const { id } = await controller.create(new FakerCar());

      const car = await controller.findOne(id);

      expect(car).toBeInstanceOf(CarEntity);
      expect(car).toHaveProperty('id', id);
    });
  });

  describe('Find All cars', () => {
    it('should find and return all car Entities', async () => {
      const c1 = await controller.create(new FakerCar());
      const c2 = await controller.create(new FakerCar());

      const allCars = await controller.findAll({}, {}, {});
      expect(allCars).toEqual(expect.arrayContaining([c1, c2]));
      expect(allCars).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            plate: expect.any(String),
          }),
        ]),
      );
    });
  });
  describe('Delete one car', () => {
    it('should remove by id and return the deleted car ', async () => {
      const { id } = await controller.create(new FakerCar());
      const car = await controller.remove(id);

      expect(car).toBeInstanceOf(CarEntity);
      expect(car).toHaveProperty('id', id);
    });
  });
});
