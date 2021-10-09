import { useMutation } from "react-query";
import api from "../../../api";
import { CarsAPI } from "./@interfaces";

export async function setCarFilter() {
  // const response = await api.get<CarsAPI>("cars", {
  //   params: {
  //     page,
  //     limit,
  //   },
  // });
}

export function useCarFilter() {
  return useMutation(async () => setCarFilter(), {
    onSuccess: async () => {
      return;
    },
    onError: (error) => {},
  });
}
