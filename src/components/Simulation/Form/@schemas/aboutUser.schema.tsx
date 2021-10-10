import { isValidCPF, isValidPhone } from "@brazilian-utils/brazilian-utils";
import differenceInYears from "date-fns/differenceInYears";
import * as Yup from "yup";

import { dateMask } from "../../../../utils/masks/date.mask";

export const aboutUserSchema = {
  name: Yup.string().notRequired(),
  cpf: Yup.string()
    .required("CPF obrigatório")
    .test("validateCpf", "CPF inválido", (value) => {
      if (value && value.length === 14) {
        return isValidCPF(value);
      }
      return false;
    }),
  birthDate: Yup.string()
    .required("Data de nascimento obrigatório")
    .transform(dateMask.transform)
    .test("validateAge", "Você precisa ter no mínimo 18 anos", (value) => {
      if (!value) return true;
      const difference = differenceInYears(new Date(), new Date(value));
      if (difference >= 18) return true;
      return false;
    }),
  phone: Yup.string().test(
    "validatePhone",
    "Número te telefone inválido",
    (value) => {
      if (!value) return true;
      console.log(value, value.length, isValidPhone(value));
      if (value.length > 14) {
        return isValidPhone(value);
      }
      return false;
    }
  ),
};
