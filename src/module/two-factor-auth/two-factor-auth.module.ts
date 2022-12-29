import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService, UserService],
})
export class TwoFactorAuthModule {}
