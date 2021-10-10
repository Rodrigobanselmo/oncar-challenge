import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";
import { currencyMask } from "../../../../utils/masks/currency.mask";

export const incomeSchema = {
  income: Yup.mixed()
    .transform(currencyMask.transform)
    .required("Renda mensal obrigatório"),
};
