import { Brand } from "../../../../../@types/brands";
import { Model } from "../../../../../@types/models";

export type BrandsAPI = Brand[];
export type ModelsAPI = Model[];

export interface GetModelBrandResponse {
  brands: Brand[];
  models: Model[];
}
