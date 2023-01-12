import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from '../../model/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { TabFilter } from './user.controller';
import { Vote } from 'src/model/vote.entity';
import { Comment } from 'src/model/comment.entity';
import { Question } from 'src/model/question.entity';
import { VoteService } from '../vote/vote.service';

const DUPLICATED = 23505;

@Injectable()
export class UserService {
  constructor(private voteService: VoteService) {}

  async getAllByTabFilter(tab) {
    const users = await User.findAll({
      include: [Comment, Vote, Question],
    });

    if (!tab) {
      tab = TabFilter.REPUTATION;
    }

    const result = await this.sortByTabFilter(users, tab);

    return result;
  }

  async create(userDto: UserDto) {
    let user;

    try {
      user = await User.create({
        username: userDto.username,
        password: userDto.password,
        email: userDto.email,
      });
    } catch (error) {
      if (error?.parent?.code == DUPLICATED) {
        throw new HttpException(
          'This username has been used!',
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        'Error add new user to database!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: 201,
      message: 'Create user successful!',
      user: user,
    };
  }

  async getById(id: number) {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id is not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByUsername(username: string) {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      return user;
    }

    throw new HttpException('This username is not exist', HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email is not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(id: number) {
    try {
      await User.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('Error delete user!', HttpStatus.BAD_REQUEST);
    }

    return {
      status: 200,
      message: `Delete user with id = ${id} successful!`,
    };
  }

  async update(user: UpdateUserDto, userId: number) {
    await User.update(
      {
        name: user.name,
        interestedTags: user.interestedTags,
        location: user.location,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    return {
      status: 200,
      message: 'Update user successful!',
    };
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return User.update(
      {
        codeVerify: secret,
      },
      {
        where: {
          id: userId,
        },
      },
    );
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return User.update(
      {
        isEnabledTwoFactorAuth: true,
      },
      {
        where: {
          id: userId,
        },
      },
    );
  }

  async sortByTabFilter(users: User[], tab) {
    switch (tab) {
      case TabFilter.VOTES:
        return this.sortByVote(users);
      case TabFilter.NEW_USERS:
        return this.sortByNewUser(users);
      case TabFilter.REPUTATION:
        return this.sortByReputation(users);
      default:
        throw new HttpException(
          'This tab filter is not supported!',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  async sortByReputation(users: User[]) {
    const result: any = [];

    for (const user of users) {
      const reputation = user.questions?.length * 10;

      result.push({
        user,
        reputation,
      });
    }

    return result.sort((a, b) => b.reputation - a.reputation);
  }

  async sortByNewUser(users: User[]) {
    const result: any = [];

    for (const user of users) {
      const now = new Date().getTime() / 1000;
      const date = new Date(user.createdAt);
      const createdAt = Math.floor(date.getTime() / 1000);

      const day = (now - createdAt) / 60 / 60 / 24;
      const hour = (day - Math.floor(day)) * 24;

      result.push({
        time: `${Math.floor(day)} days ${hour} hours!`,
        user,
        createdAt,
      });
    }

    return result.sort((a, b) => b.createdAt - a.createdAt);
  }

  async sortByVote(users: User[]) {
    const result: any = [];

    for (const user of users) {
      let vote = 0;

      for (const question of user.questions) {
        const data = await this.voteService.findVoteByQuestionId(question.id);
        vote += data.data.count;
      }

      result.push({
        vote,
        user,
      });
    }

    return result.sort((a, b) => b.vote - a.vote);
  }
}
