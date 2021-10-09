import { Car } from "../../../../../@types/cars";

export interface CarAPI extends Omit<Car, "price" | "fuel"> {
  price: number;
  fuel: "DIESEL" | "ETHNOL" | "FLEX" | "GAS" | "GASOLINE";
}
export type CarsAPI = CarAPI[];

export interface GetCarsResponse {
  totalCount: number;
  cars: Car[];
}

export interface IFilters {
  minPrice?: number;
  maxPrice?: number;
  brandName?: string;
  modelName?: string;
}
