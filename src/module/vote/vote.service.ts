import { Injectable } from '@nestjs/common';
import { Vote } from 'src/model/vote.entity';
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
    return Vote.findAll();
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
