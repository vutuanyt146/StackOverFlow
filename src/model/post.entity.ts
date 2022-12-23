import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { Comment } from './comment.entity';

@Table
export class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Tag)
  @Column
  tag_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Tag)
  tag: Tag;

  @HasMany(() => Comment)
  comments: Comment[];
}
