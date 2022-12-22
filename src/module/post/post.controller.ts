import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() postDto: PostDto): Promise<string> {
    return await this.postService.create(postDto);
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':tag_name')
  async findByTagName(@Param('tag_name') tag_name: string) {
    return await this.postService.findByTagName(tag_name);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    return await this.postService.delete(id);
  }
}
