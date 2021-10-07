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
      expect(brand).toHaveProperty('name');
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
      await service.create(new FakerBrand());
      await service.create(new FakerBrand());
      await service.create(new FakerBrand());

      const allBrands = await service.findAll();
      console.log(`allBrands`, allBrands);
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
});
