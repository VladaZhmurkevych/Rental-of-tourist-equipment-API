import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { ClientOptions } from '@nestjs/microservices';

export const AuthMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '..', '..', '..', 'proto', 'auth.proto'),
  },
};
