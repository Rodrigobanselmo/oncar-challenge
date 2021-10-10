import * as dateFns from "date-fns";
import IMask from "imask";

export const masker = ({
  masked,
  transform,
}: {
  masked: IMask.AnyMaskedOptions | IMask.AnyMasked;
  transform?: (value: string) => any;
}) => {
  const mask = IMask.createPipe(
    masked,
    IMask.PIPE_TYPE.UNMASKED,
    IMask.PIPE_TYPE.MASKED
  );

  const unmask = IMask.createPipe(
    masked,
    IMask.PIPE_TYPE.MASKED,
    IMask.PIPE_TYPE.UNMASKED
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmasked = unmask(e.target.value);
    const newValue = mask(unmasked);
    e.target.value = newValue;
  };

  return {
    mask,
    onChange,
    transform: transform || unmask,
    unmask,
  };
};
