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
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Body() findOptionsBrandDto: FindOptionsBrandDto,
  ) {
    return this.brandService.findOne(+id, findOptionsBrandDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidatePayloadExistsPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
