import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Vote, VoteType } from 'src/model/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

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

    if (data.count == 0) {
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

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    return Vote.update(
      {
        voteType: updateVoteDto.voteType,
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
