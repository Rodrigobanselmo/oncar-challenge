import { ModelRepository } from './repositories/ModelRepository';
import { ModelsService } from './services/models.service';
import { ModelsController } from './controllers/models.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, ModelRepository],
  exports: [ModelRepository],
})
export class ModelsModule {}
