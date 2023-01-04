import { Table, Column, HasMany } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { Base } from './base.entity';

@Table
export class Tag extends Base {
  @Column
  name: string;

  @HasMany(() => Question)
  question: Question[];
}
