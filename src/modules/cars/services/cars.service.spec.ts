import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { FakerCar } from '../../../../test/fake/car.fake';
import { FakerModel } from '../../../../test/fake/model.fake';
import { BrandRepository } from '../../../modules/brandCar/repositories/BrandRepository';
import { ModelRepository } from '../../../modules/modelCar/repositories/ModelRepository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CarsRepository } from '../repositories/CarsRepository';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;
  let modelRepository: ModelRepository;

  beforeAll(async () => {
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
    modelRepository = module.get<ModelRepository>(ModelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Car', () => {
    it('should create and return the Car', async () => {
      const creationCar = new FakerCar();
      const car = await service.create(creationCar);
      expect(car).toHaveProperty('id', car.id);
      expect(car).toHaveProperty('modelName');
      expect(car).toHaveProperty('brandName');
    });

    it('should create brand and model if does not exists', async () => {
      const creationCar = new FakerCar();
      const { brandName, modelName } = await service.create(creationCar);
      const model = await modelRepository.findByBrandAndModel({
        modelName,
        brandName,
      });
      expect(model).toHaveProperty('name', model.name);
    });

    it('should connect brand and model if they already exists', async () => {
      const creationModel = new FakerModel();
      const creationCar = new FakerCar();

      await modelRepository.create(creationModel);
      const car = await service.create({
        ...creationCar,
        modelName: creationModel.name,
        brandName: creationModel.brandName,
      });
      expect(car).toHaveProperty('id', car.id);
      expect(car).toHaveProperty('modelName');
      expect(car).toHaveProperty('brandName');
    });

    it('should not create if Car plate already exists', async () => {
      const creationCar = new FakerCar();

      await service.create(creationCar);
      try {
        await service.create(creationCar);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
      }
    });
  });

  describe('findOne Car', () => {
    it('should find by name and return one brand', async () => {
      const { id } = await service.create(new FakerCar());

      const car = await service.findOne(id);
      expect(car).toHaveProperty('id', id);
    });
    it('should not find if does not exists', async () => {
      try {
        await service.findOne(12312312);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Find all cars', () => {
    it('should find and return all cars with default pagination limit in createdAt order', async () => {
      const c1 = await service.create(new FakerCar());
      const c2 = await service.create(new FakerCar());

      const allCars = await service.findAll({}, {}, {});
      expect(allCars).toEqual(expect.arrayContaining([c1, c2]));
      expect(allCars).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            plate: expect.any(String),
          }),
        ]),
      );
      expect(allCars.length).toBeLessThanOrEqual(10);
    });

    it('should find and return all cars with pagination limit = 3 and filtered by brand', async () => {
      const c1 = await service.create(new FakerCar('createdBrand'));
      const c2 = await service.create(new FakerCar('createdBrand'));

      const allCars = await service.findAll(
        { limit: 3 },
        { brandName: 'createdBrand' },
        {},
      );
      expect(allCars).toEqual(expect.arrayContaining([c1, c2]));
      expect(allCars).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            brandName: 'createdBrand',
          }),
        ]),
      );
      expect(allCars.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Delete one car', () => {
    it('should remove by id and return the deleted car ', async () => {
      const { id } = await service.create(new FakerCar());
      const car = await service.remove(id);
      expect(car).toHaveProperty('id', id);
    });
    it('should not remove by id if does not exists ', async () => {
      try {
        await service.remove(12312312);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
      }
    });
  });
});
