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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PostModule,
    TagModule,
    VoteModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController, TagController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
