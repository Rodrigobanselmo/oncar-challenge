import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import api from "../../../api";
import { GetCarResponse, SetCarAPI } from "./@interfaces";

export async function createCar(car: SetCarAPI) {
  try {
    const response = await api.post<SetCarAPI, AxiosResponse<GetCarResponse>>(
      "cars",
      car
    );

    return response.data;
  } catch (error: any) {
    throw "error";
  }
}

export function useCreateCar() {
  const toast = useToast();

  return useMutation(async (car: SetCarAPI) => createCar(car), {
    onSuccess: async (resp) => {
      return resp;
    },
    onError: (error: any) => {
      toast({
        title: error?.message ?? "Não foi possivel adicionar o carro",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return;
    },
  });
}
