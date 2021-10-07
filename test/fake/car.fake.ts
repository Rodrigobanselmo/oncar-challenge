import * as faker from 'faker/locale/pt_BR';
import { FuelOptions } from '../../src/modules/cars/constants/fuel.constants';
import { CreateCarDto } from '../../src/modules/cars/dto/create-car.dto';

export class FakerCar implements CreateCarDto {
  constructor(
    private readonly connectBrand?: string,
    private readonly connectModel?: string,
    private readonly description?: string,
  ) {
    this.connectBrand
      ? (this.brandName = this.connectBrand)
      : (this.brandName =
          faker.vehicle.manufacturer() + ' ' + faker.datatype.uuid());

    this.connectModel
      ? (this.modelName = this.connectModel)
      : (this.modelName = faker.vehicle.model() + ' ' + faker.datatype.uuid());

    this.description && (this.desc = this.description);

    {
      const { connectBrand, connectModel, description, ...car } = this;
      return car;
    }
  }

  plate = faker.datatype.string();
  color = faker.commerce.color();
  price = faker.datatype.number(5000000);
  year = '2002/2003';
  kilometers = faker.datatype.number(1000000);
  fuel = Object.keys(FuelOptions)[faker.datatype.number(4)];
  desc: string | undefined;

  brandName: string;
  modelName: string;
}
