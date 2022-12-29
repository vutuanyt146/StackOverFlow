import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/passport/jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import RequestWithUser from './interface/request-with-user.interface';
import { Response } from 'express';

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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return response.sendStatus(200);
  }
}
