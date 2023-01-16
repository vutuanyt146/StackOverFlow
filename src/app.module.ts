import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TagModule } from './module/tag/tag.module';
import { VoteModule } from './module/vote/vote.module';
import { UserModule } from './module/user/user.module';
import { CommentModule } from './module/comment/comment.module';
import { AuthModule } from './module/auth/auth.module';
import { MailModule } from 'src/shared/mail/mail.module';
import { QuestionModule } from './module/question/question.module';
import { ViewModule } from './module/view/view.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TagModule,
    VoteModule,
    UserModule,
    CommentModule,
    AuthModule,
    MailModule,
    QuestionModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
