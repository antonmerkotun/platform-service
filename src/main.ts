import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app/app.module';
import { INestApplication } from '@nestjs/common';
import * as process from 'node:process';
import * as cookieParser from 'cookie-parser';

function setupCors(app: INestApplication) {
  const origin = process.env.CORS_URLS;

  app.enableCors({
    origin,
    credentials: true,
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  setupCors(app);

  await app.listen(3000);
}

bootstrap();
