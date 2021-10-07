import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FakerBrand } from 'test/fake/brand.fake';
import { FakerModel } from '../../../../test/fake/model.fake';
import { PrismaService } from '../../../prisma/prisma.service';

import { ModelRepository } from '../repositories/ModelRepository';
import { ModelsService } from './models.service';

describe('ModelsService', () => {
  let service: ModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelsService, PrismaService, ModelRepository],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create model', () => {
    it('should create brand and model and return the model', async () => {
      const creationModel = new FakerModel();

      const model = await service.create(creationModel);
      expect(model).toHaveProperty('name', creationModel.name);
      expect(model).toHaveProperty('brandName', creationModel.brandName);
    });

    it('should not create if model name already exists', async () => {
      const creationModel1 = new FakerModel();
      const creationModel2 = new FakerModel();

      await service.create(creationModel1);
      try {
        await service.create(creationModel2);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Find all brands', () => {
    it('should find and return all brands', async () => {
      const m1 = await service.create(new FakerModel());
      const m2 = await service.create(new FakerModel());
      const m3 = await service.create(new FakerModel());

      const allModels = await service.findAll();
      expect(allModels).toEqual(expect.arrayContaining([m1, m2, m3]));
      expect(allModels).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            brandName: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('Increment model', () => {
    it('should increment model num_request by value and return the model', async () => {
      const creationModel = new FakerModel();

      const { name, brandName } = await service.create(creationModel);
      const updatedModel = await service.incrementNumRequest(
        {
          modelName: name,
          brandName,
        },
        { num_requests: 1 },
      );
      expect(updatedModel).toHaveProperty('name', name);
      expect(updatedModel).toHaveProperty('brandName', brandName);
      expect(updatedModel).toHaveProperty('num_requests', 1);

      const updatedModel2 = await service.incrementNumRequest(
        {
          modelName: name,
          brandName,
        },
        { num_requests: 1 },
      );

      expect(updatedModel2).toHaveProperty('num_requests', 2);
    });

    it('should not create if model name already exists', async () => {
      const creationModel1 = new FakerModel();
      const creationModel2 = new FakerModel();

      await service.create(creationModel1);
      try {
        await service.create(creationModel2);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Delete one model', () => {
    it('should remove by name and return the deleted model ', async () => {
      const { name, brandName } = await service.create(new FakerModel());
      const model = await service.remove({ modelName: name, brandName });
      expect(model).toHaveProperty('name', name);
      expect(model).toHaveProperty('brandName', brandName);
    });
  });
});
