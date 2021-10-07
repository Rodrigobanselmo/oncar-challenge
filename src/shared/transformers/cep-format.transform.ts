import { TransformFnParams } from 'class-transformer';

function FormatCep(cep: string) {
  if (cep.length !== 8) return null;
  return `${cep}`.substring(0, 5) + '-' + `${cep}`.substring(5, 8);
}

export const CepFormatTransform = (data: TransformFnParams) => {
  const cep = String(data.obj[data.key]);
  if (typeof cep === 'string' && cep.length < 10) {
    const onlyNumbersCep = cep.replace(/\D+/g, '');
    const formattedCep = FormatCep(onlyNumbersCep);

    if (formattedCep) return formattedCep;
  }

  return null;
};
