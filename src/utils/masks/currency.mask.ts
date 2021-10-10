import * as dateFns from "date-fns";
import IMask from "imask";
import { masker } from "./index";

export const currencyMask = masker({
  masked: {
    mask: "R$ num",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ".",
        scale: 0,
        max: 100000000,
      },
    },
  } as IMask.AnyMaskedOptions | IMask.AnyMasked,
  transform: (value: string) => {
    // return Number(value.replace(/[ˆ\D ]/g, "")) || 0;
    return Number(currencyMask.unmask(value)) || null;
  },
});
