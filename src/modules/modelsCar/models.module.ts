import { ModelRepository } from './repositories/ModelRepository';
import { ModelsService } from './services/models.service';
import { ModelsController } from './controllers/models.controller';
import { Module } from '@nestjs/common';
import { BrandRepository } from '../brand/repositories/BrandRepository';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, ModelRepository, BrandRepository],
  exports: [ModelRepository],
})
export class ModelsModule {}
