import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/module/post/post.entity';
import { Tag } from 'src/module/tag/tag.entity';
import { User } from 'src/module/user/user.entity';
import { Vote } from 'src/module/vote/vote.entity';
import { Comment } from 'src/module/comment/comment.entity';

const models = [User, Post, Tag, Vote, Comment];

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
