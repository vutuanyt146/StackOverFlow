import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TagModule } from '../tag/tag.module';
import { ViewModule } from '../view/view.module';

@Module({
  imports: [TagModule, ViewModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
