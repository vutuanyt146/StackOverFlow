import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'libs/passport/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto, VerifyEmailDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Put('verify')
  async verifyMail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyMail(body.email, body.codeVerify);
  }
}
