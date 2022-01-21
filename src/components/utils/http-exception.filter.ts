import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { ValidationException } from './validation-exception';
  
  // @Catch()
  // export class AnyExceptionFilter implements ExceptionFilter {
  //   catch(exception: Error, host: ArgumentsHost) {
  //     const ctx = host.switchToHttp();
  //     const request = ctx.getRequest();
  //     const response = ctx.getResponse();
  //     const status =
  //       exception instanceof HttpException
  //         ? exception.getStatus()
  //         : HttpStatus.INTERNAL_SERVER_ERROR;
  //     if (status === 400) {
  //       response.status(status).json({
  //         statusCode: status,
  //         path: request.url,
  //         error: exception,
  //       });
  //     } else if (status === 404) {
  //       response.status(status).json({
  //         statusCode: status,
  //         path: request.url,
  //         message: NOT_FOUND,
  //       });
  //     } else {
  //       response.status(status).json({
  //         statusCode: status,
  //         path: request.url,
  //         message: exception,
  //       });
  //     }
  //   }
  // }
  
  @Catch(ValidationException)
  export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(status).json({
        status: status,
        path: request.url,
        message: exception.message,
      });
    }
  }

// import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
// import { Response } from 'express';
// import { IncomingMessage } from 'http';
// import { HttpException, HttpStatus } from '@nestjs/common';

// export const getStatusCode = (exception: unknown): number => {
//   return exception instanceof HttpException
//     ? exception.getStatus()
//     : HttpStatus.INTERNAL_SERVER_ERROR;
// };

// export const getErrorMessage = (exception: unknown): string => {
//   return String(exception);
// };

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<IncomingMessage>();
//     const code = getStatusCode(exception);
//     const message = getErrorMessage(exception);
//     console.log('exception...',exception)
//     console.log(exception?response?message : exception:'Error')

//     response.status(code).json({
//       error: {
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         code,
//         message
//       },
//     });
//   }
// }