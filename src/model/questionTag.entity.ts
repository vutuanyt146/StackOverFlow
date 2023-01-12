import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { Base } from './base.entity';
import { Tag } from './tag.entity';

@Table
export class QuestionTag extends Base {
  @ForeignKey(() => Question)
  @Column({ field: 'question_id' })
  questionId: number;

  @ForeignKey(() => Tag)
  @Column({ field: 'tag_id' })
  tagId: number;
}
