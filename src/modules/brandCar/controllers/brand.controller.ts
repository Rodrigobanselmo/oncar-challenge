import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateBrandDto } from '../dto/create-brand.dto';
import { IncludesQueryBrandDto } from '../dto/includes-query-brand.dto';
import { BrandEntity } from '../entities/brand.entity';
import { BrandService } from '../services/brand.service';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return new BrandEntity(await this.brandService.create(createBrandDto));
  }

  @Get()
  async findAll() {
    const allBrands = await this.brandService.findAll();
    return allBrands.map((brand) => new BrandEntity(brand));
  }

  @Get(':name')
  async findOne(
    @Param('name') name: string,
    @Query() includesQueryBrandDto: IncludesQueryBrandDto,
  ) {
    return new BrandEntity(
      await this.brandService.findOne(name, includesQueryBrandDto),
    );
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return new BrandEntity(await this.brandService.remove(name));
  }
}
