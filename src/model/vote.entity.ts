import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/model/user.entity';
import { Base } from './base.entity';
import { Question } from './question.entity';

export enum VoteType {
  UP_VOTE = 'UP_VOTE',
  DOWN_VOTE = 'DOWN_VOTE',
}
const VOTE_TYPE = DataType.ENUM(...Object.values(VoteType));

@Table
export class Vote extends Base {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Question)
  @Column({ field: 'question_id' })
  questionId: number;

  @Column({
    type: VOTE_TYPE,
    field: 'vote_type',
  })
  voteType: VoteType;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Question)
  question: Question;
}
