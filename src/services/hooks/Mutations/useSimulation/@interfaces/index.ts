import { Car } from "../../../../../@types/cars";

export interface SetSimulationAPI {
  name: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  email: string;
  income: number;
  haveHelp: boolean;
  dirtyName: boolean;
  address: {
    number: number;
    cep: string;
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface GetSimulationResponse {
  name: string;
  cpf: string;
  phone: string;
  message: string;
  birthDate: Date;
  score: number;
  email: string;
  income: number;
  haveHelp: boolean;
  dirtyName: boolean;
}
