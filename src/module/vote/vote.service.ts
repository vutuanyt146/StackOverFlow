import { HttpException, Injectable } from '@nestjs/common';
import { Vote } from '../../model/vote.entity';

@Injectable()
export class VoteService {
  async create(voteDto) {
    const isVoted = await Vote.findOne({
      where: {
        user_id: voteDto.user_id,
        post_id: voteDto.post_id,
      },
    });

    if (isVoted) {
      try {
        await Vote.destroy({
          where: {
            user_id: voteDto.user_id,
            post_id: voteDto.post_id,
          },
        });
      } catch (error) {
        return 'Failed delete vote!' + error;
      }
    }

    if (!isVoted || isVoted.vote_type != voteDto.vote_type) {
      try {
        Vote.create({
          user_id: voteDto.user_id,
          post_id: voteDto.post_id,
          vote_type: voteDto.vote_type,
        });
      } catch (error) {
        throw new HttpException(`Failed create vote ${error}!`, 404);
      }
    }

    return {
      status: 204,
      message: 'Successful',
    };
  }

  async countVote() {
    const upVote = await Vote.findAndCountAll({
      where: {
        vote_type: 'UP VOTE',
      },
    });

    const downVote = await Vote.findAndCountAll({
      where: {
        vote_type: 'DOWN VOTE',
      },
    });

    return {
      upVote: upVote,
      downVote: downVote,
    };
  }
}
