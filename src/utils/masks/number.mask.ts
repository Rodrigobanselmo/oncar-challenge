import { masker } from "./index";

export const numberMask = masker({
  masked: {
    mask: Number,
    scale: 0,
    signed: false,
    thousandsSeparator: " ",
    max: 10000000,
  },
  transform: (value: any) => {
    return Number(value) || 0;
  },
});
