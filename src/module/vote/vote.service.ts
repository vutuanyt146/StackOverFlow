import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from 'src/model/question.entity';
import { Vote, VoteType } from 'src/model/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VoteService {
  async create(createVoteDto: CreateVoteDto, user) {
    return Vote.create({
      userId: user.id,
      questionId: createVoteDto.questionId,
      voteType: createVoteDto.voteType,
    });
  }

  async findAll() {
    return Vote.findAndCountAll();
  }

  async findVoteByQuestionId(questionId: number) {
    const data = await Vote.findAndCountAll({ where: { questionId } });
    const isExistQuestion = Question.findAndCountAll({
      where: { id: questionId },
    });

    if (!isExistQuestion) {
      throw new HttpException(
        'The question is not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      upvote: data.rows.filter((item) => item.voteType == VoteType.UP_VOTE)
        .length,
      downvote: data.rows.filter((item) => item.voteType == VoteType.DOWN_VOTE)
        .length,
      data,
    };
  }

  async findById(id: number) {
    return Vote.findOne({ where: { id } });
  }

  async getVoteStatus(userId: number, questionId: number) {
    return Vote.findOne({
      where: {
        userId,
        questionId,
      },
    });
  }

  async update(id: number, voteType: VoteType) {
    return Vote.update(
      {
        voteType: voteType,
      },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return Vote.destroy({ where: { id } });
  }
}
