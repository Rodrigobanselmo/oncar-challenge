import IMask from "imask";
import { masker } from "./index";

export const kilometersMask = masker({
  masked: {
    mask: "num Km",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: " ",
        scale: 0,
        max: 100000000,
      },
    },
  } as IMask.AnyMaskedOptions | IMask.AnyMasked,
  transform: (value: string) => {
    // return Number(value.replace(/[ˆ\D ]/g, "")) || 0;
    return Number(kilometersMask.unmask(value)) || 0;
  },
});
