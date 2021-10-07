import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

function TestaCPF(strCPF: string) {
  if (strCPF.length !== 11) return false;

  let Some: number;
  let Rest: number;
  Some = 0;
  if (strCPF == '00000000000') return false;

  for (let i = 1; i <= 9; i++)
    Some = Some + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Rest = (Some * 10) % 11;

  if (Rest == 10 || Rest == 11) Rest = 0;
  if (Rest != parseInt(strCPF.substring(9, 10))) return false;

  Some = 0;
  for (let i = 1; i <= 10; i++)
    Some = Some + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Rest = (Some * 10) % 11;

  if (Rest == 10 || Rest == 11) Rest = 0;
  if (Rest != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

function FormatCpf(cpf: string) {
  if (cpf.length !== 11) return false;
  return (
    `${cpf}`.substring(0, 3) +
    '.' +
    `${cpf}`.substring(3, 6) +
    '.' +
    `${cpf}`.substring(6, 9) +
    '-' +
    `${cpf}`.substring(9, 11)
  );
}

export const CpfFormatTransform = (data: TransformFnParams) => {
  const cpf = String(data.obj[data.key]);
  if (typeof cpf === 'string' && cpf.length < 15) {
    const onlyNumbersCpf = cpf.replace(/\D+/g, '');

    const isValidCpf = TestaCPF(onlyNumbersCpf);

    if (!isValidCpf) throw new BadRequestException('Cpf inválido');
    const formattedCpf = FormatCpf(onlyNumbersCpf);
    return formattedCpf;
  }

  return null;
};
