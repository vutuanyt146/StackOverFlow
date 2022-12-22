import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async Create(@Body() commentDto: CommentDto) {
    return await this.commentService.Create(commentDto);
  }

  @Get(':post_id')
  async Get(@Param('post_id') post_id: number) {
    return await this.commentService.Get(post_id);
  }

  @Get()
  async GetChillComment(@Body() body) {
    return await this.commentService.GetChillComment(body.comment_id);
  }
}
