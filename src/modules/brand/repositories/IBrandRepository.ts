import { IncludesQueryBrandDto } from '../dto/includes-query-brand.dto';
import { Brand, Prisma } from '.prisma/client';
import { CreateBrandDto } from './../dto/create-brand.dto';

interface IBrandRepository {
  create(createBrandDto: CreateBrandDto): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findByName(
    name: string,
    includesQueryBrandDto?: IncludesQueryBrandDto,
  ): Promise<Brand | undefined>;
  deleteByName(name: string): Promise<Prisma.Prisma__BrandClient<Brand>>;
}
export { IBrandRepository };
