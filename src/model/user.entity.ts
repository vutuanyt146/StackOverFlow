import { Column, HasMany, Table } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { Comment } from 'src/model/comment.entity';
import { Vote } from './vote.entity';
import { Base } from './base.entity';
import { Exclude } from 'class-transformer';

@Table
export class User extends Base {
  @Column({
    unique: true,
  })
  username: string;

  @Exclude()
  @Column
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  name: string;

  @Column({
    defaultValue: false,
    field: 'is_active',
  })
  isActive: boolean;

  @Column({ field: 'code_verify' })
  codeVerify: string;

  @Column({ field: 'interested_tags' })
  interestedTags: string;

  @Column
  location: string;

  @Column
  avatar: string;

  @Column({
    defaultValue: false,
    field: 'is_enabled_2fa',
  })
  isEnabled2FA: boolean;

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Vote)
  votes: Vote[];
}
