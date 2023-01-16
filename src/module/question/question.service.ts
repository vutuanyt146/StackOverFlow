import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from 'src/model/question.entity';
import { Tag } from 'src/model/tag.entity';
import { User } from 'src/model/user.entity';
import { Comment } from 'src/model/comment.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ViewService } from '../view/view.service';
import { CreateViewDto } from '../view/dto/create-view.dto';
import { View } from 'src/model/view.entity';
import { TIME_RESET_VIEW } from 'src/shared/constant/constant';

@Injectable()
export class QuestionService {
  constructor(private viewService: ViewService) {}

  async create(user, createQuestionDto: CreateQuestionDto) {
    return Question.create({
      title: createQuestionDto.title,
      textContent: createQuestionDto.textContent,
      userId: user.id,
    });
  }

  async findAll() {
    return Question.findAll({ include: [Tag], order: [['createdAt', 'DESC']] });
  }

  async findById(id: number, userId) {
    userId = 1;
    const isExistQuestion = await Question.findOne({
      where: { id },
    });

    if (!isExistQuestion) {
      throw new HttpException(
        'This question is not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (userId) {
      const isExistView = await View.findOne({
        where: {
          userId,
          questionId: id,
        },
      });
console.log('here');

      if (!isExistView) {
        const viewDto: CreateViewDto = new CreateViewDto();
        viewDto.questionId = id;

        await this.viewService.create(userId, viewDto);
        this.increaseView(isExistQuestion.id, isExistQuestion.views);
      } else {
        console.log(Date.now() - isExistView.updatedAt);
        if (Date.now() - isExistView.updatedAt >= TIME_RESET_VIEW) {
          await this.viewService.update(isExistView.id);
          this.increaseView(isExistQuestion.id, isExistQuestion.views);
        }
      }
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
    const question = user.questions.find((item) => item.id == id);

    question.comments.map(async (item) => {
      const result = await this.getCommentAuthor(item);
      return result;
    });

    const a = await Promise.all(
      question.comments.map((item) => {
        const result = this.getCommentAuthor(item);
        return result;
      }),
    );
    const data = question.dataValues;
    data['comments'] = a;
    const reputation = user.questions?.length * 10;

    return {
      data,
      reputation,
    };
  }

  async getCommentAuthor(comment: Comment) {
    const user = await User.findOne({
      where: { id: comment.userId },
      attributes: ['username'],
    });
    const result = { ...comment.dataValues };
    result['author'] = user.username;

    return result;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return Question.update(
      {
        title: updateQuestionDto.title,
        textContent: updateQuestionDto.textContent,
      },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return Question.destroy({ where: { id } });
  }

  async increaseView(id: number, views: number) {
    await Question.update(
      {
        views: views + 1,
      },
      {
        where: { id },
      },
    );
  }
}
