import { AutoIncrement, Column, Model, PrimaryKey } from 'sequelize-typescript';

export class Base extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;
}
