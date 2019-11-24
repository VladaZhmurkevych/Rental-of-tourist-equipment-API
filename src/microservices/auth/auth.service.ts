import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthenticatedUser, LoginData, ValidateTokenData } from './auth.interfaces';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto.service';

@Controller()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  @GrpcMethod('AuthService', 'Authenticate')
  async login({ username, password }: LoginData): Promise<AuthenticatedUser> {
    const user = await this.userRepository.findOne({ username });
    const response = {
      id: 0,
      username: '',
      token: '',
      success: false,
    };
    if (user && await this.cryptoService.compare(password, user.password)) {
      response.id = user.id;
      response.username = user.username;
      response.token = this.jwtService.sign({ username, password: user.password, id: user.id });
      response.success = true;
    }
    return response;
  }

  @GrpcMethod('AuthService', 'ValidateUser')
  async validateToken({token}) {
    const result = { isValid: false }
    try {
      const data = this.jwtService.verify(token);
      const user = this.userRepository.findOne(data.id)
      if (user) { result.isValid = true; }
    } catch (e) {
      console.log(e);
    }
    return result;
  }

}
