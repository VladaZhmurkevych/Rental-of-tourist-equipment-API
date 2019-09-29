import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './equipment/utils/exeption.filter';
import * as helmet from 'helmet';
import { Provider1Module } from './provider1/provider1.module';
import { Provider2Module } from './provider2/provider2.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const provider1App = await NestFactory.create(Provider1Module);
  const provider2App = await NestFactory.create(Provider2Module);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  provider1App.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  provider2App.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.use(helmet());
  provider1App.use(helmet());
  provider2App.use(helmet());

  await app.listen(process.env.PORT);
  await provider1App.listen(process.env.PORT_PROVIDER_1);
  await provider2App.listen(process.env.PORT_PROVIDER_2);
}
bootstrap();
