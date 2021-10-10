import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";

import { numberMask } from "../../../../utils/masks/number.mask";

export const addressSchema = {
  address: Yup.object({
    cep: Yup.string()
      .required("CEP obrigatório")
      .test("validateCEP", "CEP inválido", (value) => {
        if (value && value.length === 9) {
          return isValidCEP(value);
        }
        return false;
      }),
    number: Yup.number()
      .transform(numberMask.transform)
      .required("Numero obrigatório")
      .positive("Numero número deve ser maior que 0"),
    street: Yup.string(),
    complement: Yup.string(),
    neighborhood: Yup.string(),
    city: Yup.string(),
    estate: Yup.string(),
  }),
};
