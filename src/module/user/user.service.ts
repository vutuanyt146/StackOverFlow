import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from '../../model/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async findAll() {
    return User.findAll();
  }

  async create(userDto: UserDto) {
    let user;

    try {
      user = await User.create({
        username: userDto.username,
        password: userDto.password,
        email: userDto.email,
        name: userDto.name,
        phone: userDto.phone,
        role: userDto.role,
      });
    } catch (error) {
      if (error.parent?.code == 23505) {
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
        phone: user.phone,
        avatar: user.avatar,
        interestedTags: user.interestedTags,
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
}
