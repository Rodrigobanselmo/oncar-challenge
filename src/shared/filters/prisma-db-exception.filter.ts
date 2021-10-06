import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class PrismaDbExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const { code, meta, clientVersion } = exception;

    if (code && meta && clientVersion) {
      const {
        cause = 'database error',
        target = ['database error'],
        field_name = '',
      } = meta;
      console.log(`meta`, meta);
      console.log(`code`, code);
      switch (code) {
        case 'P2002':
          exception = new BadRequestException(
            `Data you trying to create already exists: property ${target.join(
              ', ',
            )} is conflicting`,
          );
          break;

        case 'P2025':
          exception = new NotFoundException(cause);
          break;

        case 'P2003':
          if (field_name.includes('Model_'))
            exception = new BadRequestException(
              'Brand related does not exists',
            );
          if (field_name.includes('Car_'))
            exception = new BadRequestException(
              'Brand related does not exists',
            );
          break;

        default:
          console.log(`meta`, meta);
          console.log(`code`, code);
          break;
      }
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // do something to warn me about de error
      console.log('do something to warn me about de error');
    }
    super.catch(exception, host);
  }
}
