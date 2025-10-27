import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { LoggingInterceptor } from './common/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(4000);
  Logger.log('🚀 API Gateway is running on http://localhost:4000');
}
bootstrap();
