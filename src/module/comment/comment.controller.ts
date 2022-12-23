import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() commentDto: CommentDto) {
    return await this.commentService.create(commentDto);
  }

  @Get()
  async get(@Query() query) {
    const postId = query['postId'];
    const commentId = query['commentId'];
    return await this.commentService.get(postId, commentId);
  }
}
