import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

export enum TimeFilter {
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
  ALL = 'all',
}

export enum TabFilter {
  REPUTATION = 'reputation',
  NEW_USERS = 'new_users',
  VOTES = 'votes',
  EDITORS = 'editors',
  MODERATORS = 'moderators',
}

export enum Filter {
  // TIME = 'TimeFilter',
  TAB = 'TabFilter',
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query) {
    const tab = query[Filter.TAB];

    return this.userService.findAll(tab);
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    const user = await this.userService.create(userDto);

    return {
      message: 'Create user successful',
      status: 201,
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);

    return {
      message: 'Delete user successful',
      status: 200,
    };
  }
}
