import { NestFactory } from '@nestjs/core';
import { BookingMicroserviceOptions } from './microservices/booking/microservice.options';
import { BookingModule } from './microservices/booking/booking.module';

async function bootstrap() {
  const bookingMicroservice = await NestFactory.createMicroservice(BookingModule, BookingMicroserviceOptions)
  await bookingMicroservice.listen(() => console.log('Booking microservice is listening'));
}
bootstrap();
