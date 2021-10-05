import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreateModelDto } from '../dto/create-Model.dto';
import { UpdateModelDto } from '../dto/update-Model.dto';
import { IModelRepository } from './IModelRepository';
import { Model, Prisma } from '.prisma/client';

@Injectable()
export class ModelRepository implements IModelRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createModelDto: CreateModelDto) {
    return this.prisma.model.create({
      data: { num_requests: 0, ...createModelDto },
    });
  }

  update(id: number, updateModelDto: UpdateModelDto): Promise<Model> {
    return this.prisma.model.update({
      where: { id: id },
      data: updateModelDto,
    });
  }

  findAll(): Promise<Model[]> {
    return this.prisma.model.findMany();
  }

  findById(id: number): Promise<Model> {
    return this.prisma.model.findUnique({
      where: { id },
    });
  }

  findByBrandIdAndModel(brandId: number, model: string): Promise<Model> {
    return this.prisma.model.findUnique({
      where: {
        Model_model_brandId_key: {
          model,
          brandId,
        },
      },
    });
  }

  async deleteById(id: number): Promise<Prisma.Prisma__ModelClient<Model>> {
    console.log(`id,2`, id, 2);
    return this.prisma.model.delete({ where: { id } });
  }
}

// : cars
//           ? {
//               take: 10,
//             }
//           : false,
