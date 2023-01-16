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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { TagService } from '../tag/tag.service';
import { QuestionTag } from 'src/model/questionTag.entity';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly tagService: TagService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Req() req) {
    const tagList = await this.tagService.getOrCreateTagList(
      createQuestionDto.tagName,
    );

    const question = await this.questionService.create(
      req.user,
      createQuestionDto,
    );

    for (const tag of tagList) {
      await QuestionTag.create({
        tagId: tag.id,
        questionId: question.id,
      });
    }

    return {
      message: 'Create question successful',
      status: 201,
      data: question,
    };
  }

  @Get()
  async findAll(@Body() body) {
    return this.questionService.findAll(body.pageSize, body.pageNumber);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Body() body) {
    return this.questionService.findById(+id, body.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    await this.questionService.update(+id, updateQuestionDto);

    return {
      message: 'Update question successful',
      status: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const isExistQuestion = await this.questionService.findById(
      +id,
      req.user.id,
    );

    if (!isExistQuestion) {
      throw new HttpException(
        `The question with id ${id} is not exist!`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (req.user.id != isExistQuestion.data.id) {
      throw new HttpException(
        'This question is not belong to you!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.questionService.remove(+id);

    return {
      message: 'Delete question successful',
      status: 200,
    };
  }
}
