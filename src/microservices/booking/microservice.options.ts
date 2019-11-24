import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { ClientOptions } from '@nestjs/microservices';

export const BookingMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'booking',
    protoPath: join(__dirname, '..', '..', '..', 'proto', 'booking.proto'),
  },
};
