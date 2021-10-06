import { Model, Prisma } from '.prisma/client';
import { CreateModelDto } from '../dto/create-model.dto';
import { ParamsModelDto } from '../dto/params-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';

interface IModelRepository {
  create(createBrandDto: CreateModelDto): Promise<Model>;
  updateByBrandAndModel(
    paramsModelDto: ParamsModelDto,
    updateModelDto: UpdateModelDto,
  ): Promise<Model>;
  findAll(): Promise<Model[]>;
  findByBrandAndModel(
    paramsModelDto: ParamsModelDto,
  ): Promise<Model | undefined>;
  deleteByBrandAndModel(
    paramsModelDto: ParamsModelDto,
  ): Promise<Prisma.Prisma__ModelClient<Model>>;
}
export { IModelRepository };
