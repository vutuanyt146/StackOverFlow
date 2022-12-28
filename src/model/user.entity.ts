import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/model/post.entity';
import { Comment } from 'src/model/comment.entity';
import { Vote } from './vote.entity';

const ROLE = DataType.ENUM('ADMIN', 'DEVELOPER', 'CUSTOMER', 'MAINTAINER');

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  name: string;

  @Column
  phone: string;

  @Column({
    type: ROLE,
  })
  role: string;

  @Column({
    defaultValue: false,
  })
  is_active: boolean;

  @Column
  code_verify: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Vote)
  votes: Vote[];
}
