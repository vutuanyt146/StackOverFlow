import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  async create(@Body() userDto: UserDto): Promise<string> {
    return await this.userService.create(userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    return await this.userService.delete(id);
  }
}
