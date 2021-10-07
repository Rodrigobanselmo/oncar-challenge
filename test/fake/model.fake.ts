import * as faker from 'faker/locale/pt_BR';
import { CreateModelDto } from 'src/modules/modelCar/dto/create-Model.dto';

export class FakerModel implements CreateModelDto {
  constructor(private readonly initialBrand?: string) {
    this.initialBrand
      ? (this.brandName = this.initialBrand)
      : (this.brandName =
          faker.vehicle.manufacturer() + ' ' + faker.random.word());
  }

  readonly brandName: string;
  readonly name = faker.vehicle.model() + ' ' + faker.random.word();
}
