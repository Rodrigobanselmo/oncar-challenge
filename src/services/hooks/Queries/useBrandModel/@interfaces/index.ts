import { Brand } from "../../../../../@types/brands";
import { Model } from "../../../../../@types/models";

export type BrandsAPI = Brand[];
export type ModelsAPI = Model[];

export interface GetResponse {
  brands: Brand[];
  models: Model[];
}
