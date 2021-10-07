import * as faker from 'faker/locale/pt_BR';
import { FuelOptions } from 'src/modules/cars/constants/fuel.constants';
import { CreateCarDto } from 'src/modules/cars/dto/create-car.dto';

export class FakerCar implements CreateCarDto {
  constructor(
    private readonly connectBrand?: string,
    private readonly connectModel?: string,
    private readonly description?: string,
  ) {
    this.connectBrand
      ? (this.brandName = this.connectBrand)
      : (this.brandName =
          faker.vehicle.manufacturer() + ' ' + faker.datatype.number(1000));

    this.connectModel
      ? (this.brandName = this.connectModel)
      : (this.brandName =
          faker.vehicle.model() + ' ' + faker.datatype.number(1000));

    this.description && (this.desc = this.description);
  }

  plate = faker.datatype.string(8);
  color = faker.commerce.color();
  price = faker.datatype.number(5000000);
  year = '2002/2003';
  kilometers = faker.datatype.number(1000000);
  fuel = Object.keys(FuelOptions)[faker.datatype.number(4)];
  desc: string | undefined;

  readonly brandName: string;
  readonly modelName: string;
}
