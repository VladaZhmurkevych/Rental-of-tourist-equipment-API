import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() { username, password }, @Request() req) {
    return this.authService.authenticate(username, password);
  }
}
