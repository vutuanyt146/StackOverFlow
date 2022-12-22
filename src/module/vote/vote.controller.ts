import { Body, Controller, Get, Post } from '@nestjs/common';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async create(@Body() voteDto: VoteDto) {
    return await this.voteService.create(voteDto);
  }

  @Get()
  async countVote() {
    return await this.voteService.countVote();
  }
}
