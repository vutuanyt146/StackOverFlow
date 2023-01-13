import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [QuestionModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
