import { ParamsModelDto } from './../dto/params-model.dto';
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

  @Patch('/:modelName/:brandName')
  async updateNewRequest(
    @Param() paramsModelDto: ParamsModelDto,
    @Body(ValidatePayloadExistsPipe) updateModelDto: UpdateModelDto,
  ) {
    return new ModelEntity(
      await this.modelsService.update(paramsModelDto, updateModelDto),
    );
  }

  @Delete('/:modelName/:brandName')
  async remove(@Param() paramsModelDto: ParamsModelDto) {
    return new ModelEntity(await this.modelsService.remove(paramsModelDto));
  }
}
