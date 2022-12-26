import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/passport/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() user, @Body() commentDto: CommentDto) {
    return await this.commentService.create(user.user, commentDto);
  }

  @Get()
  async get(@Query() query) {
    const postId = query['postId'];
    const commentId = query['commentId'];

    return await this.commentService.get(postId, commentId);
  }
}
