import { Table, Column, BelongsToMany } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { Base } from './base.entity';
import { QuestionTag } from './questionTag.entity';

@Table
export class Tag extends Base {
  @Column
  name: string;

  @BelongsToMany(() => Question, () => QuestionTag)
  questions: Question[];
}
