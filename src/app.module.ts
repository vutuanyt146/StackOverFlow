import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './module/post/post.module';
import { TagController } from './module/tag/tag.controller';
import { TagModule } from './module/tag/tag.module';
import { VoteModule } from './module/vote/vote.module';
import { UserController } from './module/user/user.controller';
import { UserModule } from './module/user/user.module';
import { CommentModule } from './module/comment/comment.module';
import { UserService } from 'src/module/user/user.service';
import { AuthModule } from './module/auth/auth.module';
import { MailModule } from 'libs/mail/mail.module';
import { MailController } from 'libs/mail/mail.controller';
import { MailService } from 'libs/mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PostModule,
    TagModule,
    VoteModule,
    UserModule,
    CommentModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController, TagController, UserController, MailController],
  providers: [AppService, UserService, MailService],
})
export class AppModule {}
