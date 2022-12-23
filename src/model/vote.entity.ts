import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/model/user.entity';
import { Post } from './post.entity';

const VOTE_TYPE = DataType.ENUM('UP VOTE', 'DOWN VOTE');

@Table
export class Vote extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Post)
  @Column
  post_id: number;

  @Column({
    type: VOTE_TYPE,
  })
  vote_type: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  post: Post;
}
