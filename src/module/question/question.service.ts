import { Injectable } from '@nestjs/common';
import { Question } from 'src/model/question.entity';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  async create(tagId, user, createQuestionDto: CreateQuestionDto) {
    return Question.create({
      title: createQuestionDto.title,
      textContent: createQuestionDto.textContent,
      codeContent: createQuestionDto.codeContent,
      userId: user.id,
      tagId,
    });
  }

  async findAll() {
    return Question.findAll({ include: [Tag] });
  }

  async findById(id: number) {
    return Question.findOne({ where: { id }, include: [User] });
  }

  async update(
    id: number,
    tagId: number,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    return Question.update(
      {
        title: updateQuestionDto.title,
        textContent: updateQuestionDto.textContent,
        codeContent: updateQuestionDto.codeContent,
        tagId,
      },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return Question.destroy({ where: { id } });
  }
}
