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

  describe('Create user', () => {
    it('should create and return the brand', async () => {
      const creationData = new FakerBrand();

      const brand = await service.create(creationData);
      expect(brand).toHaveProperty('name');
    });
  });
});
