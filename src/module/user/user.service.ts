import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from '../../model/user.entity';

@Injectable()
export class UserService {
  async findAll() {
    return await User.findAll();
  }

  async create(userDto: UserDto): Promise<string> {
    try {
      await User.create({
        username: userDto.username,
        password: userDto.password,
        email: userDto.email,
        name: userDto.name,
        phone: userDto.phone,
        role: userDto.role,
      });
    } catch (error) {
      if (error.parent.code == 23505) return 'This username has been used!';
      return 'Error add new user to database!\n' + error.name;
    }

    return 'Create user successful!';
  }

  async delete(id: number): Promise<string> {
    try {
      await User.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return 'Error delete user!';
    }

    return 'Delete user with id successful!';
  }
}
