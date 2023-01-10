import { TEXT } from 'sequelize';
import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { Base } from './base.entity';
import { Comment } from './comment.entity';

@Table
export class Question extends Base {
  @Column
  title: string;

  @Column({ field: 'text_content', type: TEXT })
  textContent: string;

  @Column({ field: 'code_content', type: TEXT })
  codeContent: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Tag)
  @Column({ field: 'tag_id' })
  tagId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Tag)
  tag: Tag;

  @HasMany(() => Comment)
  comments: Comment[];
}