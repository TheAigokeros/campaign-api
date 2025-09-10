import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, ResponseInterceptor, RequestInterceptor } from './common/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalInterceptors(new ResponseInterceptor());
   app.useGlobalInterceptors(new RequestInterceptor());
   
  //  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // console.log(`running ${process.env.PORT}`)

  await app.listen(process.env.PORT ?? 3000);
}



bootstrap();
