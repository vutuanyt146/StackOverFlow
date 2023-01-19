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
import { Question } from 'src/model/question.entity';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { QuestionService } from '../question/question.service';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly questionService: QuestionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const isExistQuestion = await Question.findByPk(
      createCommentDto.questionId,
    );

    if (!isExistQuestion) {
      throw new HttpException(
        'This question is not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (createCommentDto.commentId) {
      const isCommentExist = await this.commentService.findById(
        createCommentDto.commentId,
      );

      if (!isCommentExist) {
        throw new HttpException(
          'Your comment you reply is not exist!',
          HttpStatus.NOT_FOUND,
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

  @Get('/:commentId/commentId')
  async getByCommentId(@Param('commentId') commentId) {
    const isExistComment = await this.commentService.findById(commentId);

    if (!isExistComment && commentId != 0) {
      throw new HttpException(
        'Your comment is not exist!',
        HttpStatus.NOT_FOUND,
      );
    }
    const questionId = isExistComment.questionId;

    return this.commentService.getByCommentId(commentId, questionId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const isExistComment = await this.commentService.findById(+id);

    if (!isExistComment) {
      throw new HttpException(
        'Your comment is not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: 200,
      comment: isExistComment,
    };
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
  async remove(@Param('id') id: string, @Req() req) {
    const isExistComment = await this.commentService.findById(+id);

    if (!isExistComment) {
      throw new HttpException(
        `The comment with id ${id} is not exist!`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (req.user.id != isExistComment.userId) {
      throw new HttpException(
        'This comment is not belong to you!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.commentService.remove(+id);

    return {
      message: 'Delete comment successful',
      status: 200,
    };
  }
}
