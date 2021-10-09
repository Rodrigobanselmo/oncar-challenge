import { Brand } from "../../../@types/brands";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { GetResponse, BrandsAPI, ModelsAPI } from "./@interfaces";
import api from "../../api";
import { sortAsc } from "../../../utils/sort/asc.sort";

export async function getBrands(): Promise<GetResponse> {
  const responseBrand = await api.get<BrandsAPI>("brand");
  const responseModel = await api.get<ModelsAPI>("models");
  const brands = responseBrand.data.sort((a, b) => sortAsc(a, b, "name"));
  const models = responseModel.data.sort((a, b) => sortAsc(a, b, "name"));

  await new Promise((res) =>
    setTimeout(() => {
      res("");
    }, 1000)
  );

  return {
    models,
    brands,
  };
}

export function useBrandModel(
  options?: UseQueryOptions
): UseQueryResult<GetResponse, unknown> {
  const brands = useQuery("brand-model", () => getBrands(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...(options as any),
  }) as UseQueryResult<GetResponse, unknown>;

  return brands;
}
