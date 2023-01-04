import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    const user = await this.userService.create(userDto);

    return {
      message: 'Create user successful',
      status: 200,
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() user: UpdateUserDto, @Req() req) {
    await this.userService.update(user, req.user.id);

    return {
      message: 'Update user successful',
      status: 200,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);

    return {
      message: 'Delete user successful',
      status: 200,
    };
  }
}
