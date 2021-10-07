import { TransformFnParams } from 'class-transformer';

export const dateTransform = (data: TransformFnParams) => {
  const date = data.obj[data.key];
  const newDate = new Date(date);

  if (!newDate) return null;

  return newDate;
};
