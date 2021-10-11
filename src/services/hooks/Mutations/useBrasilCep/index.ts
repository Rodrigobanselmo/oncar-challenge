import { Center, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { cepMask } from "../../../../utils/masks/cep.mask";
import api from "../../../api";
import { CepAPI, GetCEPResponse } from "./@interfaces";

export async function getCep(cep: string) {
  try {
    const response = await api.get<CepAPI>(
      `https://brasilapi.com.br/api/cep/v1/${cep.replace(/[ˆ\D ]/g, "")}`
    );
    const formatCEP = response.data?.cep ? cepMask.mask(cep) : "";

    const address: GetCEPResponse = {
      ...response.data,
      cep: formatCEP,
    };

    return address;
  } catch (error: any) {
    throw "error";
  }
}

export function useBrasilCep() {
  const toast = useToast();

  return useMutation(async (cep: string) => getCep(cep), {
    onSuccess: async (resp) => {
      return resp;
    },
    onError: (error) => {
      toast({
        title: `CEP não encontrado`,
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return;
    },
  });
}
