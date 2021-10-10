import { Car } from "../../../../../@types/cars";

export interface CepAPI {
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface GetCEPResponse {
  number: number;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}
