import { Test, TestingModule } from '@nestjs/testing';

import { FakerModel } from '../../../../test/fake/model.fake';
import { PrismaService } from '../../../prisma/prisma.service';
import { ModelEntity } from '../entities/model.entity';
import { ModelRepository } from '../repositories/ModelRepository';
import { ModelsService } from '../services/models.service';
import { ModelsController } from './models.controller';

describe('ModelsController', () => {
  let controller: ModelsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelsController],
      providers: [ModelsService, PrismaService, ModelRepository],
    }).compile();

    controller = module.get<ModelsController>(ModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Model', () => {
    it('should create and return an instance of ModelEntity', async () => {
      const creationData = new FakerModel();

      const brand = await controller.create(creationData);
      expect(brand).toBeInstanceOf(ModelEntity);
    });
  });

  describe('Find all Models', () => {
    it('should find and return all Models', async () => {
      const m1 = await controller.create(new FakerModel());
      const m2 = await controller.create(new FakerModel());
      const m3 = await controller.create(new FakerModel());

      const allModels = await controller.findAll();
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

  describe('Update Model num request', () => {
    it('should find and return all Modals Entities ', async () => {
      const creationModel = new FakerModel();

      const { name, brandName } = await controller.create(creationModel);
      const updatedModel = await controller.updateNewRequest(
        {
          modelName: name,
          brandName,
        },
        { num_requests: 1 },
      );
      expect(updatedModel).toBeInstanceOf(ModelEntity);
      expect(updatedModel).toHaveProperty('num_requests', 1);
    });
  });

  describe('Delete one Model', () => {
    it('should remove by name and return the deleted EntityModel', async () => {
      const { name, brandName } = await controller.create(new FakerModel());
      const model = await controller.remove({ modelName: name, brandName });
      expect(model).toBeInstanceOf(ModelEntity);
      expect(model).toHaveProperty('name', name);
    });
  });
});
