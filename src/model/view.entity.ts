import { IsNotEmpty } from 'class-validator';
import { Column, ForeignKey, Table } from 'sequelize-typescript';
import { Base } from './base.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

@Table
export class View extends Base {
  @IsNotEmpty()
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @IsNotEmpty()
  @ForeignKey(() => Question)
  @Column({ field: 'question_id' })
  questionId: number;
}
