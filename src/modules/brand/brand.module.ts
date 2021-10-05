import { Module } from '@nestjs/common';
import { BrandService } from './service/brand.service';
import { BrandController } from './controller/brand.controller';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
