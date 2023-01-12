import {
  Body,
  Controller,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { AuthService } from './auth.service';
import {
  AuthLoginDto,
  AuthRegisterDto,
  TwoFactorAuthCodeDto,
} from './dto/auth.dto';
import RequestWithUser from './interface/request-with-user.interface';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { User } from 'src/model/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  async verifyMail(@Query() query) {
    const email = query['email'];
    const codeVerify = query['codeVerify'];

    return this.authService.verifyMail(email, codeVerify);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generate(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpAuthUrl } =
      await this.authService.generateTwoFactorAuthenticationSecret(
        request.user,
      );

    return this.authService.pipeQrCodeStream(response, otpAuthUrl);
  }

  @Post('turn-on')
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Body() twoFactorAuthenticationCode: TwoFactorAuthCodeDto,
    @Req() request: RequestWithUser,
  ) {
    const user = await User.findOne({
      where: {
        id: request.user.id,
      },
    });

    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode.codeVerify,
      user,
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.id);
  }
}
