import * as faker from 'faker/locale/pt_BR';
import { CreateModelDto } from '../../src/modules/modelCar/dto/create-model.dto';

export class FakerModel implements CreateModelDto {
  constructor(private readonly initialBrand?: string) {
    this.initialBrand
      ? (this.brandName = this.initialBrand)
      : (this.brandName =
          faker.vehicle.manufacturer() + ' ' + faker.datatype.uuid());

    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initialBrand, ...model } = this;
      return model;
    }
  }

  readonly brandName: string;
  readonly name =
    faker.vehicle.model() +
    ' ' +
    faker.random.word() +
    ' ' +
    faker.name.firstName();
}
