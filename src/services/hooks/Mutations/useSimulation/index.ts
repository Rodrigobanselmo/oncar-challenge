import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import api from "../../../api";
import { GetSimulationResponse, SetSimulationAPI } from "./@interfaces";

export async function setSimulation(simulation: SetSimulationAPI) {
  try {
    const response = await api.post<
      SetSimulationAPI,
      AxiosResponse<GetSimulationResponse>
    >("simulations", simulation);

    return response.data;
  } catch (error: any) {
    throw "error";
  }
}

export function useSetSimulation() {
  const toast = useToast();

  return useMutation(
    async (simulation: SetSimulationAPI) => setSimulation(simulation),
    {
      onSuccess: async (resp) => {
        return resp;
      },
      onError: (error: any) => {
        toast({
          title: error?.message ?? "Não foi possivel verificar seu crédito",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return;
      },
    }
  );
}
