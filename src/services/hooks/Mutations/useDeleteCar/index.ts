import { queryClient } from "./../../../queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import api from "../../../api";
import { GetCarResponse } from "./@interfaces";

export async function createCar(carId: string | number) {
  try {
    const response = await api.delete<AxiosResponse<GetCarResponse>>(
      "cars/" + carId
    );

    return response.data;
  } catch (error: any) {
    throw "error";
  }
}

export function useDeleteCar() {
  const toast = useToast();
  const router = useRouter();

  return useMutation(async (carId: string | number) => createCar(carId), {
    onSuccess: async (resp) => {
      router.push("/");
      queryClient.invalidateQueries(["cars"]);
      return resp;
    },
    onError: (error: any) => {
      toast({
        title: error?.message ?? "Não foi possivel deletar o carro",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return;
    },
  });
}
