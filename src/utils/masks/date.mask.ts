import * as dateFns from "date-fns";
import { masker } from "./index";
import IMask from "imask";

const dateFormatClient = "dd/MM/yyyy";
const dateFormatApi = "yyyy-MM-dd";

export const dateMask = masker({
  masked: {
    mask: Date,
    pattern: dateFormatClient,
    blocks: {
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: new Date().getFullYear(),
      },
    },
    format: (date: any) => {
      return dateFns.format(date, dateFormatClient);
    },
    parse: (dateStr: any) => {
      return dateFns.parse(dateStr, dateFormatClient, new Date());
    },
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }
    const date = dateFns.parse(value, dateFormatClient, new Date());
    return dateFns.format(date, dateFormatApi);
  },
});
