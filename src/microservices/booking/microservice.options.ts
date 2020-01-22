import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { ClientOptions } from '@nestjs/microservices';

export const BookingMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:8001',
    package: 'booking',
    protoPath: join(__dirname, '..', '..', '..', 'proto', 'booking.proto'),
  },
};

export const BookingMicroserviceOptionsExternal: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'booking-service:8001',
    package: 'booking',
    protoPath: join(__dirname, '..', '..', '..', 'proto', 'booking.proto'),
  },
};
