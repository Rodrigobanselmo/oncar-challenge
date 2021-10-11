export type SimulationFormData = {
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
};
