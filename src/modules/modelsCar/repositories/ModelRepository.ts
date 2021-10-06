import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreateModelDto } from '../dto/create-Model.dto';
import { UpdateModelDto } from '../dto/update-Model.dto';
import { IModelRepository } from './IModelRepository';
import { Model, Prisma } from '.prisma/client';
import { ParamsModelDto } from '../dto/params-model.dto';

@Injectable()
export class ModelRepository implements IModelRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createModelDto: CreateModelDto) {
    return this.prisma.model.create({
      data: createModelDto,
    });
  }

  updateByBrandAndModel(
    { brandName, modelName }: ParamsModelDto,
    updateModelDto: UpdateModelDto,
  ): Promise<Model> {
    return this.prisma.model.update({
      where: {
        Model_model_brand_key: {
          name: modelName,
          brandName,
        },
      },
      data: updateModelDto,
    });
  }

  findAll(): Promise<Model[]> {
    return this.prisma.model.findMany();
  }

  findByBrandAndModel({
    brandName,
    modelName,
  }: ParamsModelDto): Promise<Model> {
    return this.prisma.model.findUnique({
      where: {
        Model_model_brand_key: {
          name: modelName,
          brandName,
        },
      },
    });
  }

  async deleteByBrandAndModel({
    brandName,
    modelName,
  }: ParamsModelDto): Promise<Prisma.Prisma__ModelClient<Model>> {
    return this.prisma.model.delete({
      where: {
        Model_model_brand_key: {
          name: modelName,
          brandName,
        },
      },
    });
  }
}

// : cars
//           ? {
//               take: 10,
//             }
//           : false,
