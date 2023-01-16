import { Column, Table } from 'sequelize-typescript';
import { Base } from './base.entity';

@Table
export class View extends Base {
  @Column({ field: 'user_id' })
  userId: number;

  @Column({ field: 'question_id' })
  questionId: number;
}
