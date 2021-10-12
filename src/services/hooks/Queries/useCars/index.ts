import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { FuelOptions } from "../../../../constants/fuel-options.constants";
import api from "../../../api";
import { CarsAPI, GetCarsResponse, IFilters } from "./@interfaces";

export async function getCars(
  page: number,
  limit: number,
  filter: IFilters
): Promise<GetCarsResponse> {
  const response = await api.get<CarsAPI>("cars", {
    params: {
      page,
      limit,
      ...filter,
    },
  });

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
  filters = {} as IFilters,
  options?: UseQueryOptions
): UseQueryResult<GetCarsResponse, unknown> {
  const brands = useQuery(
    ["cars", page, limit, filters],
    () => getCars(page, limit, filters),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...(options as any),
    }
  ) as UseQueryResult<GetCarsResponse, unknown>;

  return brands;
}
