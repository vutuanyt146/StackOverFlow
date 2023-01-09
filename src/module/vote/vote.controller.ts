import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { Vote } from 'src/model/vote.entity';

@UseGuards(JwtAuthGuard)
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async create(@Body() createVoteDto: CreateVoteDto, @Req() req) {
    const isVoteExist = await Vote.findOne({
      where: {
        userId: req.user.id,
        questionId: createVoteDto.questionId,
      },
    });

    if (isVoteExist) {
      if (createVoteDto.voteType != isVoteExist.voteType) {
        return await this.voteService.update(isVoteExist.id, createVoteDto);
      }

      return await this.voteService.remove(isVoteExist.id);
    }

    return this.voteService.create(createVoteDto, req.user);
  }

  @Get()
  async findAll() {
    return this.voteService.findAll();
  }

  @Get('/question/:questionId')
  async findVoteByQuestionId(@Param('questionId') questionId: number) {
    return this.voteService.findVoteByQuestionId(questionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.voteService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateVoteDto: UpdateVoteDto) {
    await this.voteService.update(id, updateVoteDto);

    return {
      message: 'Update vote successful',
      status: 200,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.voteService.remove(+id);

    return {
      message: 'Delete vote successful',
      status: 200,
    };
  }
}
