import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async create(@Body() voteDto: VoteDto) {
    return await this.voteService.create(voteDto);
  }

  @Get('postId/:postId')
  async countVote(@Param('postId') postId: number) {
    return await this.voteService.countVote(postId);
  }
}
