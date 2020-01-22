import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { ClientOptions } from '@nestjs/microservices';

export const AuthMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:8000',
    package: 'auth',
    protoPath: join(__dirname, '..', '..', '..', 'proto', 'auth.proto'),
  },
};

export const AuthMicroserviceOptionsExternal: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'auth-service:8000',
    package: 'auth',
    protoPath: join(__dirname, '..', '..', '..', 'proto', 'auth.proto'),
  },
};
