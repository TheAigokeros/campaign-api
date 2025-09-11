import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  ResponseInterceptor,
  RequestInterceptor,
} from './common/interceptor';
import Redis from 'ioredis';

import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as express from 'express';
import { getQueueToken } from '@nestjs/bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new RequestInterceptor());

  const redis = new Redis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: 5,
    retryStrategy: (times) => {
      console.log(`Redis reconnect attempt #${times}`);
      return Math.min(times * 1500, 2000);
    },
  });

  try {
    await redis.ping();
    console.log('✅ Redis is connected');
  } catch (err) {
    console.error('❌ Redis connection failed', err);
    process.exit(1);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // === Bull Board Setup ===
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const emailQueue = app.get(getQueueToken('email'));
  createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());
  // ========================

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`📊 Bull Board available at: http://localhost:${process.env.PORT ?? 3000}/admin/queues`);
}

bootstrap();
