import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { jwtConstants } from 'libs/constant/constant';
import { JwtStrategy } from 'libs/passport/jwt.stratery';
import { AuthController } from './auth.controller';
import { MailModule } from 'libs/mail/mail.module';
import { MailService } from 'libs/mail/mail.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy, MailService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
