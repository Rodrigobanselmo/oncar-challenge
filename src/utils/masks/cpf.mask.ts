import IMask from "imask";
import { masker } from "./index";

export const cpfMask = masker({
  masked: {
    mask: [
      {
        mask: "000.000.000-00",
      },
    ],
  } as IMask.AnyMasked,
});
