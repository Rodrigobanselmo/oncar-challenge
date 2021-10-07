import { TransformFnParams } from 'class-transformer';

export const StringUppercaseTransform = (data: TransformFnParams) => {
  const str = data.obj[data.key];
  if (typeof str === 'string') {
    return str.toUpperCase();
  }

  return null;
};
