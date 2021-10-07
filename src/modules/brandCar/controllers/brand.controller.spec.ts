import { Test, TestingModule } from '@nestjs/testing';

import { FakerBrand } from '../../../../test/fake/brand.fake';
import { PrismaService } from '../../../prisma/prisma.service';
import { BrandEntity } from '../entities/brand.entity';
import { BrandRepository } from '../repositories/BrandRepository';
import { BrandService } from '../services/brand.service';
import { BrandController } from './brand.controller';

describe('BrandController', () => {
  let controller: BrandController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [BrandService, PrismaService, BrandRepository],
    }).compile();

    controller = module.get<BrandController>(BrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create brand', () => {
    it('should create and return an instance of BrandEntity', async () => {
      const creationData = new FakerBrand();

      const brand = await controller.create(creationData);
      expect(brand).toBeInstanceOf(BrandEntity);
    });
  });

  describe('Find All brands', () => {
    it('should find and return all Brand Entities', async () => {
      const b1 = await controller.create(new FakerBrand());
      const b2 = await controller.create(new FakerBrand());
      const b3 = await controller.create(new FakerBrand());

      const allBrands = await controller.findAll();
      expect(allBrands).toEqual(expect.arrayContaining([b1, b2, b3]));
      expect(allBrands).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            created_at: expect.any(Date),
          }),
        ]),
      );
    });
  });

  describe('Find one brand', () => {
    it('should find by name and return one EntityBrand', async () => {
      const { name } = await controller.create(new FakerBrand());

      const brand = await controller.findOne(name, {});

      expect(brand).toBeInstanceOf(BrandEntity);
      expect(brand).toHaveProperty('name', name);
      expect(brand).not.toHaveProperty('cars');
      expect(brand).not.toHaveProperty('models');
    });
    it('should find by name and return one EntityBrand with its related models and cars', async () => {
      const { name } = await controller.create(new FakerBrand());

      const brand = await controller.findOne(name, {
        models: 'get',
        cars: 'get',
      });
      expect(brand).toBeInstanceOf(BrandEntity);
      expect(brand).toHaveProperty('name', name);
      expect(brand).toHaveProperty('cars', []);
      expect(brand).toHaveProperty('models', []);
    });
  });

  describe('Delete one brand', () => {
    it('should remove by name and return the deleted EntityBrand ', async () => {
      const { name } = await controller.create(new FakerBrand());
      const brand = await controller.remove(name);
      expect(brand).toBeInstanceOf(BrandEntity);
      expect(brand).toHaveProperty('name', name);
    });
  });
});
