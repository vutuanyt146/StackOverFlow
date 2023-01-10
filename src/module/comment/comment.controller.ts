import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    if (createCommentDto.commentId) {
      const isCommentExist = await this.commentService.findById(
        createCommentDto.commentId,
      );

      if (!isCommentExist) {
        throw new HttpException(
          'Your comment you reply is not exist!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const comment = await this.commentService.create(
      req.user,
      createCommentDto,
    );

    return {
      message: 'Create message successful',
      status: 201,
      data: comment,
    };
  }

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.commentService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentService.update(+id, updateCommentDto);

    return {
      message: 'Update comment successful',
      status: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentService.remove(+id);

    return {
      message: 'Delete comment successful',
      status: 200,
    };
  }
}
