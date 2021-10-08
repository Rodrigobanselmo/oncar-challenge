import * as faker from 'faker/locale/pt_BR';
import { FuelOptions } from '../../src/modules/cars/constants/fuel.constants';
import { CreateCarDto } from '../../src/modules/cars/dto/create-car.dto';

export class FakerCar implements CreateCarDto {
  constructor(private readonly data?: Partial<CreateCarDto>) {
    this.data && this.data?.brandName
      ? (this.brandName = this.data.brandName)
      : (this.brandName =
          faker.vehicle.manufacturer() + ' ' + faker.datatype.uuid());

    this.data && this.data?.modelName
      ? (this.modelName = this.data.modelName)
      : (this.modelName = faker.vehicle.model() + ' ' + faker.datatype.uuid());

    this.data && this.data?.desc && (this.desc = this.data.desc);
    this.data && this.data?.price && (this.price = this.data.price);

    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, ...car } = this;
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
