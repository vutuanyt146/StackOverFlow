import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { User } from '../../model/user.entity';

@Injectable()
export class UserService {
  async findAll() {
    return await User.findAll();
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
      if (error.parent.code == 23505) {
        throw new HttpException(
          'This username has been used!',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Error add new user to database!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: 204,
      message: 'Create user successful!',
      user: user,
    };
  }

  async delete(id: number) {
    try {
      await User.destroy({
        where: {
          id: id,
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
}
