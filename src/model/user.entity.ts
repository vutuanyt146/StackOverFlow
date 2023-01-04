import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { Comment } from 'src/model/comment.entity';
import { Vote } from './vote.entity';
import { Base } from './base.entity';

export enum Role {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  CUSTOMER = 'CUSTOMER',
  MAINTAINER = 'MAINTAINER',
}
const ROLE = DataType.ENUM(...Object.values(Role));

@Table
export class User extends Base {
  @Column({
    unique: true,
  })
  username: string;

  @Column
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  name: string;

  @Column
  phone: string;

  @Column({
    type: ROLE,
  })
  role: Role;

  @Column({
    defaultValue: false,
    field: 'is_active',
  })
  isActive: boolean;

  @Column({ field: 'code_verify' })
  codeVerify: string;

  @Column({ field: 'interested_tags' })
  interestedTags: string;

  @Column({
    defaultValue: false,
    field: 'is_enabled_two_factor_auth',
  })
  isEnabledTwoFactorAuth: boolean;

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Vote)
  votes: Vote[];
}
