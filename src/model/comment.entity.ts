import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { User } from 'src/model/user.entity';
import { Base } from './base.entity';

@Table
export class Comment extends Base {
  @Column
  content: string;

  @Column({ field: 'comment_id' })
  commentId?: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Question)
  @Column({ field: 'question_id' })
  questionId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Question)
  question: Question;
}
