import { TEXT } from 'sequelize';
import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { Base } from './base.entity';
import { Comment } from './comment.entity';
import { QuestionTag } from './questionTag.entity';
import { Vote } from './vote.entity';

@Table
export class Question extends Base {
  @Column
  title: string;

  @Column({ field: 'text_content', type: TEXT })
  textContent: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @Column({ defaultValue: 0 })
  views: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => QuestionTag)
  tags: Tag[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Vote)
  votes: Vote[];
}
