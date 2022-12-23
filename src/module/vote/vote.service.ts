import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Vote } from '../../model/vote.entity';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VoteService {
  async create(voteDto: VoteDto) {
    const isVoted = await Vote.findOne({
      where: {
        user_id: voteDto.userId,
        post_id: voteDto.postId,
      },
    });

    if (isVoted) {
      try {
        await Vote.destroy({
          where: {
            user_id: voteDto.userId,
            post_id: voteDto.postId,
          },
        });
      } catch (error) {
        throw new HttpException('Failed delete vote!', HttpStatus.BAD_REQUEST);
      }
    }

    if (!isVoted || isVoted.vote_type != voteDto.voteType) {
      try {
        Vote.create({
          user_id: voteDto.userId,
          post_id: voteDto.postId,
          vote_type: voteDto.voteType,
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

  async countVote(postId: number) {
    const upVote = await Vote.findAndCountAll({
      where: {
        vote_type: 'UP VOTE',
        post_id: postId,
      },
    });

    const downVote = await Vote.findAndCountAll({
      where: {
        vote_type: 'DOWN VOTE',
        post_id: postId,
      },
    });

    return {
      upVote: upVote,
      downVote: downVote,
    };
  }
}
