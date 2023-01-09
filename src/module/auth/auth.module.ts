import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { jwtConstants } from 'src/shared/constant/constant';
import { JwtStrategy } from 'src/shared/passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/shared/mail/mail.module';
import { MailService } from 'src/shared/mail/mail.service';
import { UserService } from '../user/user.service';
import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
    MailModule,
    VoteModule,
  ],
  providers: [AuthService, JwtStrategy, MailService, UserService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
