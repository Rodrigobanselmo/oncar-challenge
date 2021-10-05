import { ValidatePayloadExistsPipe } from './../../../shared/pipes/validates-payload-exists.pipe';
import { ModelsService } from '../services/models.service';
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
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { ModelEntity } from '../entities/model.entity';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  async create(@Body() createModelDto: CreateModelDto) {
    return new ModelEntity(await this.modelsService.create(createModelDto));
  }

  @Get()
  async findAll() {
    const allModels = await this.modelsService.findAll();
    return allModels.map((model) => new ModelEntity(model));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidatePayloadExistsPipe) updateModelDto: UpdateModelDto,
  ) {
    return new ModelEntity(
      await this.modelsService.update(+id, updateModelDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return new ModelEntity(await this.modelsService.remove(+id));
  }
}
