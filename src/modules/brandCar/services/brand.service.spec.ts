import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FakerBrand } from '../../../../test/fake/brand.fake';

import { PrismaService } from '../../../prisma/prisma.service';
import { BrandRepository } from '../repositories/BrandRepository';
import { BrandService } from './brand.service';

// fakerBrand;
describe('BrandService', () => {
  let service: BrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandService, PrismaService, BrandRepository],
    }).compile();

    service = module.get<BrandService>(BrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create brand', () => {
    it('should create and return the brand', async () => {
      const creationData = new FakerBrand();

      const brand = await service.create(creationData);
      expect(brand).toHaveProperty('name', creationData.name);
    });

    it('should not create if brand name already exists', async () => {
      const creationData1 = new FakerBrand();
      const creationData2 = new FakerBrand();

      await service.create(creationData1);
      try {
        await service.create(creationData2);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Find all brands', () => {
    it('should find and return all brands', async () => {
      const b1 = await service.create(new FakerBrand());
      const b2 = await service.create(new FakerBrand());
      const b3 = await service.create(new FakerBrand());

      const allBrands = await service.findAll();
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
    it('should find by name and return one brand', async () => {
      const { name } = await service.create(new FakerBrand());

      const brand = await service.findOne(name, {});
      expect(brand).toHaveProperty('name', name);
      expect(brand).not.toHaveProperty('cars');
      expect(brand).not.toHaveProperty('models');
    });
    it('should find by name and return one brand with its related models and cars', async () => {
      const { name } = await service.create(new FakerBrand());

      const brand = await service.findOne(name, { models: 'get', cars: 'get' });
      expect(brand).toHaveProperty('name', name);
      expect(brand).toHaveProperty('cars', []);
      expect(brand).toHaveProperty('models', []);
    });
  });
  describe('Delete one brand', () => {
    it('should remove by name and return the deleted brand ', async () => {
      const { name } = await service.create(new FakerBrand());
      const brand = await service.remove(name);
      expect(brand).toHaveProperty('name', name);
    });
  });
});
