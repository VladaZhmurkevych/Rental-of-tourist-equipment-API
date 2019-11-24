import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../database/database.module';
import { usersProvider } from './user.provider';
import { CryptoService } from './crypto.service';
const { AUTH_SECRET } = process.env;

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: AUTH_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    usersProvider,
    CryptoService,
  ],
  controllers: [
    AuthService,
  ],
  exports: [],
})
export class AuthModule {}
