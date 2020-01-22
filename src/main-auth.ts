import { NestFactory } from '@nestjs/core';
import { AuthModule } from './microservices/auth/auth.module';
import { AuthMicroserviceOptions } from './microservices/auth/microservice.options';

async function bootstrap() {
  const authMicroservice = await NestFactory.createMicroservice(AuthModule, AuthMicroserviceOptions)
  await authMicroservice.listen(() => console.log('Auth microservice is listening'));
}
bootstrap();
