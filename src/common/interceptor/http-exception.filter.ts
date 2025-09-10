import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HeaderProperties } from '../modules/context';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		// const requestId = request.headers[HeaderProperties.requestId] ?? null;

		let status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let message =
			exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

		if (typeof message === 'object' && message['message']) {
			message = message['message'];
		}

		response.status(status).json({
			// requestId,
			status: 'error',
			message: message || 'Error',
			code: exception instanceof HttpException ? exception.name : 'INTERNAL_SERVER_ERROR',
		});
	}
}
