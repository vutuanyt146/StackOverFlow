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
import { Vote } from 'src/model/vote.entity';

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

  async findAll(pageSize: number, pageNumber: number) {
    if (!pageSize || !pageNumber) {
      return Question.findAll({
        include: [Tag, Vote, Comment, User],
        order: [['createdAt', 'DESC']],
      });
    }

    return Question.findAll({
      include: [Tag, Vote, Comment, User],
      order: [['createdAt', 'DESC']],
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      subQuery: false,
    });
  }

  async getById(id: number, userId) {
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

      if (!isExistView) {
        const viewDto: CreateViewDto = new CreateViewDto();
        viewDto.questionId = id;

        await this.viewService.create(userId, viewDto);
        this.increaseView(isExistQuestion.id, isExistQuestion.views);
      } else {
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

    let comments = await Promise.all(
      question.comments.map((item) => {
        const result = this.getCommentAuthor(item);
        return result;
      }),
    );
    comments = comments.filter((item) => item.commentId === 0);

    const data = question.dataValues;
    data['comments'] = comments;
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
