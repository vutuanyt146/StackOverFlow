import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/passport/jwt-auth.guard';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() user, @Body() postDto: PostDto) {
    return await this.postService.create(user.user, postDto);
  }

  @Get()
  async findAll(@Query() query) {
    const tagName = query['tagName'];
    const id = query['id'];

    return await this.postService.findAll(tagName, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postService.delete(id);
  }
}
