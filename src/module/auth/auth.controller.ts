import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Get('verify')
  async verifyMail(@Query() query) {
    const email = query['email'];
    const codeVerify = query['codeVerify'];

    return this.authService.verifyMail(email, codeVerify);
  }
}
