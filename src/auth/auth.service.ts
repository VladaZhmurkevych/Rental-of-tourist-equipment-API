import { Body, Controller, Injectable, OnModuleInit, Post, Request } from '@nestjs/common';
import { Client, ClientGrpc, ClientProxy, GrpcOptions } from '@nestjs/microservices';
import { AuthMicroserviceOptions, AuthMicroserviceOptionsExternal } from '../microservices/auth/microservice.options';
import { Observable } from 'rxjs';
import { LoginData, ValidateTokenData } from '../microservices/auth/auth.interfaces';

interface AuthMicroService {
  authenticate({ username, password }: LoginData): Observable<any>;
  validateUser({ token }: ValidateTokenData): Observable<any>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  @Client(AuthMicroserviceOptionsExternal)
  private client: ClientGrpc;

  private authService: AuthMicroService;

  onModuleInit() {
    this.authService = this.client.getService<AuthMicroService>('AuthService');
  }

  authenticate(username, password) {
    return this.authService.authenticate({ username, password });
  }

  validate(token) {
    return this.authService.validateUser({ token });
  }
}
