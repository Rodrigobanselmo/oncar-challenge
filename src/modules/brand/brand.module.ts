import { Module } from '@nestjs/common';

import { BrandController } from './controllers/brand.controller';
import { BrandRepository } from './repositories/BrandRepository';
import { BrandService } from './services/brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandRepository],
})
export class BrandModule {}
