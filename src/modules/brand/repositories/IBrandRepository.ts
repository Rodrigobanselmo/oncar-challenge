import { FindOptionsBrandDto } from './../dto/find-options-brand.dto';
import { UpdateBrandDto } from './../dto/update-brand.dto';
import { Brand, Prisma } from '.prisma/client';
import { CreateBrandDto } from './../dto/create-brand.dto';

interface IBrandRepository {
  create(createBrandDto: CreateBrandDto): Promise<Brand>;
  update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(
    id: number,
    findOptionsBrandDto?: FindOptionsBrandDto,
  ): Promise<Brand | undefined>;
  findByBrand(brand: string): Promise<Brand | undefined>;
  deleteById(id: number): Promise<Prisma.Prisma__BrandClient<Brand>>;
}
export { IBrandRepository };
