import { UpdateBrandDto } from './../dto/update-brand.dto';
import { Brand } from '.prisma/client';
import { CreateBrandDto } from './../dto/create-brand.dto';

interface IBrandRepository {
  create(createBrandDto: CreateBrandDto): Promise<Brand>;
  update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(id: number): Promise<Brand | undefined>;
  deleteById(id: number): Promise<void>;
}
export { IBrandRepository };
