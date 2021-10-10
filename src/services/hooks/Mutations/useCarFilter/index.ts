import { useMutation } from "react-query";
import api from "../../../api";
import { CepAPI, GetCEPResponse } from "./@interfaces";

export async function getCep(cep: string) {
  const response = await api.get<CepAPI>(
    `https://brasilapi.com.br/api/cep/v1/${cep.replace(/[ˆ\D ]/g, "")}`
  );

  return response;
}

export function useBrasilCep() {
  return useMutation(async (cep: string) => getCep(cep), {
    onSuccess: async (resp) => {
      return resp;
    },
    onError: (error) => {},
  });
}
