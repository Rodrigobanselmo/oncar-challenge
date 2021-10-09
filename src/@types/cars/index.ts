import { FuelOptions } from "../../constants/fuel-options.constants";

export type Car = {
  id: number;
  plate: string;
  color: string;
  price: string;
  year: string;
  kilometers: number;
  fuel: string;
  desc?: string;
  modelName: string;
  brandName: string;
  updatedAt: Date;
  createdAt: Date;
};

// | FuelOptions.DIESEL
// | FuelOptions.ETHNOL
// | FuelOptions.FLEX
// | FuelOptions.GAS
// | FuelOptions.GASOLINE;
