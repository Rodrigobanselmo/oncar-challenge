import { Car } from "../../../../../@types/cars";

export interface GetCarResponse {
  id: number;
  plate: string;
  color: string;
  price: number;
  year: string;
  kilometers: number;
  fuel: string;
  modelName: string;
  brandName: string;
}
