import { Car } from "../../../../@types/cars";

export interface CarAPI extends Omit<Car, "price" | "fuel"> {
  price: number;
  fuel: "DIESEL" | "ETHNOL" | "FLEX" | "GAS" | "GASOLINE";
}
export type CarsAPI = CarAPI[];

export interface GetResponse {
  totalCount: number;
  cars: Car[];
}
