import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/module/post/post.entity';
import { User } from 'src/module/user/user.entity';

@Table
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  content: string;

  @Column
  comment_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Post)
  @Column
  post_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  post: Post;
}
