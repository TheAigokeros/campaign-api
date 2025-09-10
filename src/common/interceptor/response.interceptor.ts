// common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderProperties } from '../modules/context';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((result) => {
        const statusCode = response.statusCode ?? HttpStatus.OK;
        const message =
          HttpStatus[statusCode as keyof typeof HttpStatus] ?? 'OK';
        // const requestId = request.headers[HeaderProperties.requestId] ?? null;

        return {
          // requestId,
          statusCode,
          message,
          data: result ?? null,
        };
      }),
    );
  }
}
