import IMask from "imask";
import { masker } from "./index";

export const cepMask = masker({
  masked: {
    mask: [
      {
        mask: "00000-000",
      },
    ],
  } as IMask.AnyMasked,
});
