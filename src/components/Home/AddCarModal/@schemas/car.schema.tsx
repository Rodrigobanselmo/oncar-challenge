import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";
import { currencyMask } from "../../../../utils/masks/currency.mask";
import { kilometersMask } from "../../../../utils/masks/kilometers.mask";

export const carSchema = {
  plate: Yup.string()
    .required("Placa do veículo obrigatório")
    .min(7, "Deve ter no mínimo 7 characters")
    .max(8),
  brandName: Yup.string().required("Marca do veículo obrigatório"),
  modelName: Yup.string().required("Modelo do veículo obrigatório"),
  year: Yup.string()
    .length(9, "Data inválida, deve estar no formato xxxx/xxxx")
    .required("Data de fabricação obrigatório"),
  price: Yup.mixed()
    .transform(currencyMask.transform)
    .required("Preço do veículo obrigatório"),
  kilometers: Yup.mixed()
    .transform(kilometersMask.transform)
    .required("Kilometragem obrigatório"),
};
