import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { IModelRepository } from './IModelRepository';
import { Model, Prisma } from '.prisma/client';
import { ParamsModelDto } from '../dto/params-model.dto';

@Injectable()
export class ModelRepository implements IModelRepository {
  constructor(private readonly prisma: PrismaService) {}

  create({ name, brandName }: CreateModelDto) {
    return this.prisma.model.create({
      data: {
        name,
        brand: {
          connectOrCreate: {
            create: {
              name: brandName,
            },
            where: {
              name: brandName,
            },
          },
        },
      },
    });
  }

  updateByBrandAndModel(
    { brandName, modelName }: ParamsModelDto,
    { num_requests }: UpdateModelDto,
  ): Promise<Model> {
    return this.prisma.model.update({
      where: {
        Model_model_brand_key: {
          name: modelName,
          brandName,
        },
      },
      data: {
        num_requests: {
          increment: num_requests,
        },
      },
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
