import { Injectable } from '@nestjs/common';
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

    return {
      upvote: data.rows.filter((item) => item.voteType == VoteType.UP_VOTE)
        .length,
      downvote: data.rows.filter((item) => item.voteType == VoteType.DOWN_VOTE)
        .length,
      data,
    };
  }

  async findOne(id: number) {
    return Vote.findOne({ where: { id } });
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
