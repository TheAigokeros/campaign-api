import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestInterceptor.name);

  private convertRequestFormat(context: ExecutionContext): void {
    const http = context.switchToHttp();
    const request = http.getRequest();

    try {
      request.body =
        typeof request.body === 'string'
          ? JSON.parse(request.body)
          : request.body;
    } catch (error) {
      this.logger.error(error?.stack);
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.convertRequestFormat(context);

    return next.handle();
  }
}
