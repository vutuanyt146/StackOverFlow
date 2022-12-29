import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'libs/passport/jwt-auth.guard';
import { User } from 'src/model/user.entity';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { UserService } from '../user/user.service';
import { TwoFactorAuthCodeDto } from './dto/two-factor-auth.dto';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private userService: UserService,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
        request.user,
      );

    return this.twoFactorAuthService.pipeQrCodeStream(response, otpauthUrl);
  }

  @Post('turnon')
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

    const isCodeValid =
      this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode.codeVerify,
        user,
      );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.id);
  }
}
