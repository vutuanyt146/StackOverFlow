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
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { TagService } from '../tag/tag.service';

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly tagService: TagService,
  ) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Req() req) {
    const tag = await this.tagService.getOrCreateTag(createQuestionDto.tagName);

    const question = this.questionService.create(
      tag.id,
      req.user,
      createQuestionDto,
    );

    return {
      message: 'Create question successful',
      status: 200,
      data: question,
    };
  }

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const tag = await this.tagService.getOrCreateTag(updateQuestionDto.tagName);
    await this.questionService.update(+id, tag.id, updateQuestionDto);

    return {
      message: 'Update question successful',
      status: 200,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.questionService.remove(+id);

    return {
      message: 'Delete question successful',
      status: 200,
    };
  }
}
