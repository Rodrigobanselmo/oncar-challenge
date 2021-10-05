import { Model, Prisma } from '.prisma/client';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';

interface IModelRepository {
  create(createBrandDto: CreateModelDto): Promise<Model>;
  update(id: number, updateModelDto: UpdateModelDto): Promise<Model>;
  findAll(): Promise<Model[]>;
  findById(id: number): Promise<Model | undefined>;
  findByBrandIdAndModel(
    brandId: number,
    Model: string,
  ): Promise<Model | undefined>;
  deleteById(id: number): Promise<Prisma.Prisma__ModelClient<Model>>;
}
export { IModelRepository };
