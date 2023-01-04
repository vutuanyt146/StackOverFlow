import { Sequelize } from 'sequelize-typescript';
import { Question } from 'src/model/question.entity';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { Vote } from 'src/model/vote.entity';
import { Comment } from 'src/model/comment.entity';

const models = [User, Question, Tag, Vote, Comment];

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        logging: true,
      });
      sequelize.addModels(models);
      await sequelize.sync();
      return sequelize;
    },
  },
];
