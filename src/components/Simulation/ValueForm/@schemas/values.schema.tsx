import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";
import { currencyMask } from "../../../../utils/masks/currency.mask";

export const valueSchema = {
  carPrice: Yup.mixed()
    .transform(currencyMask.transform)
    .required("Valor do veículo obrigatório"),
  initPayment: Yup.mixed()
    .transform(currencyMask.transform)
    .required("Valor de entrada obrigatório")
    .test({
      message: "A entrada deve ser menor que o preço do carro",
      test: function (value) {
        return value <= parseFloat(this.parent.carPrice);
      },
    }),
};
