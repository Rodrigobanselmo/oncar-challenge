import { TransformFnParams } from 'class-transformer';

function FormatPhoneNumber(phoneNumber: string) {
  if (length === 10) {
    return (
      '(' +
      `${phoneNumber}`.substring(0, 2) +
      ') ' +
      `${phoneNumber}`.substring(2, 6) +
      '-' +
      `${phoneNumber}`.substring(6, 10)
    );
  } else if (length === 11) {
    return (
      '(' +
      `${phoneNumber}`.substring(0, 2) +
      ') ' +
      `${phoneNumber}`.substring(2, 7) +
      '-' +
      `${phoneNumber}`.substring(7, 11)
    );
  }

  return null;
}

export const PhoneFormatTransform = (data: TransformFnParams) => {
  const phoneNumber = String(data.obj[data.key]);
  if (typeof phoneNumber === 'string' && phoneNumber.length < 16) {
    const onlyNumbersCpf = phoneNumber.replace(/\D+/g, '');
    const formattedNumber = FormatPhoneNumber(onlyNumbersCpf);

    if (formattedNumber) return formattedNumber;
  }

  return null;
};
