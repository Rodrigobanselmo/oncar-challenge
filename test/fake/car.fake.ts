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

    const date = this.random(1970, 2021);
    this.year = `${date}/${date + 1}`;

    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, random, ...car } = this;
      return car;
    }
  }

  plate = faker.datatype.string(7);
  color = faker.commerce.color();
  price = faker.datatype.number(500) * 1000;
  kilometers = faker.datatype.number(1000000);
  fuel = Object.keys(FuelOptions)[faker.datatype.number(4)];
  year: string;
  brandName: string;
  modelName: string;
  desc: string | undefined;

  private random? = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
}
