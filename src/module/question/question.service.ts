import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from 'src/model/question.entity';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  async create(user, createQuestionDto: CreateQuestionDto) {
    return Question.create({
      title: createQuestionDto.title,
      textContent: createQuestionDto.textContent,
      codeContent: createQuestionDto.codeContent,
      userId: user.id,
    });
  }

  async findAll() {
    return Question.findAll({ include: [Tag], order: [['createdAt', 'DESC']] });
  }

  async findById(id: number) {
    const isExistQuestion = await Question.findOne({
      where: { id },
    });

    if (!isExistQuestion) {
      throw new HttpException(
        'This question is not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await User.findOne({
      where: { id: isExistQuestion?.userId },
      include: [
        {
          model: Question,
          include: ['comments'],
        },
      ],
    });

    const reputation = user.questions?.length * 10;

    return {
      user,
      reputation,
    };
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return Question.update(
      {
        title: updateQuestionDto.title,
        textContent: updateQuestionDto.textContent,
        codeContent: updateQuestionDto.codeContent,
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
