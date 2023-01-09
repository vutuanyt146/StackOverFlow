import { Module } from '@nestjs/common';
import { VoteModule } from '../vote/vote.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [VoteModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
