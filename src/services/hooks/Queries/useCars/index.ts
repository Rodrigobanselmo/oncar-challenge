import { Brand } from "../../../../@types/brands";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { GetResponse, CarsAPI } from "./@interfaces";
import api from "../../../api";
import { sortAsc } from "../../../../utils/sort/asc.sort";
import { FuelOptions } from "../../../../constants/fuel-options.constants";

export async function getCars(
  page: number,
  limit: number
): Promise<GetResponse> {
  const response = await api.get<CarsAPI>("cars", {
    params: {
      page,
      limit,
    },
  });

  await new Promise((res) =>
    setTimeout(() => {
      res("");
    }, 1000)
  );

  const cars = response.data;
  const totalCount = Number(response.headers["x-total-count"]);
  const formatCars = cars.map((car) => {
    const price = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(car.price);

    return {
      ...car,
      price,
      fuel: FuelOptions[car.fuel] || "...",
    };
  });

  return {
    cars: formatCars,
    totalCount,
  };
}

export function useCars(
  page: number,
  limit = 10,
  options?: UseQueryOptions
): UseQueryResult<GetResponse, unknown> {
  const brands = useQuery(["cars", page, limit], () => getCars(page, limit), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...(options as any),
  }) as UseQueryResult<GetResponse, unknown>;

  return brands;
}
