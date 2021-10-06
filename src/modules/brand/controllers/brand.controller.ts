import { ValidatePayloadExistsPipe } from './../../../shared/pipes/validates-payload-exists.pipe';
import { FindOptionsBrandDto } from './../dto/find-options-brand.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandEntity } from '../entities/brand.entity';

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

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
    @Query() findOptionsBrandDto: FindOptionsBrandDto,
  ) {
    return new BrandEntity(
      await this.brandService.findOne(+id, findOptionsBrandDto),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidatePayloadExistsPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return new BrandEntity(await this.brandService.update(+id, updateBrandDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new BrandEntity(await this.brandService.remove(+id));
  }
}
