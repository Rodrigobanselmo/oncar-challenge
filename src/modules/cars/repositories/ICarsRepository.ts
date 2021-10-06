import { IncludesQueryDto } from './../dto/includes-query.dto';
import { Car, Prisma } from '.prisma/client';
import { PaginationQueryDto } from 'src/modules/cars/dto/pagination-query.dto';
import { CreateCarDto } from '../dto/create-car.dto';
import { FilterQueryDto } from '../dto/filter-query.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

interface ICarsRepository {
  create(createCarDto: CreateCarDto): Promise<Car>;
  update(id: number, updateCarDto: UpdateCarDto): Promise<Car>;
  findAll(
    paginationQuery: PaginationQueryDto,
    filterQueryDto: FilterQueryDto,
    includesQueryDto: IncludesQueryDto,
  ): Promise<Car[]>;
  findById(id: number): Promise<Car | undefined>;
  findByPlate(plate: string): Promise<Car | undefined>;
  deleteById(id: number): Promise<Prisma.Prisma__CarClient<Car>>;
}
export { ICarsRepository };
