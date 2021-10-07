import { TransformFnParams } from 'class-transformer';

export const keepOnlyNumberTransform = (data: TransformFnParams) => {
  const str = data.obj[data.key];
  if (typeof str === 'string') return Number(str.replace(/\D+/g, ''));

  return str;
};
