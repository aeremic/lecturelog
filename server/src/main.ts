import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Disable error messages for PROD
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, /*disableErrorMessages: true*/ }));
  app.enableCors();

  await app.listen(30000);
}
bootstrap();
