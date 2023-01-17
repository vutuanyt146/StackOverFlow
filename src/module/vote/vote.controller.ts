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
  Query,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { Vote } from 'src/model/vote.entity';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(JwtAuthGuard)
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
        await this.voteService.update(isVoteExist.id, createVoteDto.voteType);

        return {
          message: 'Update vote success!',
          status: 200,
        };
      }

      createVoteDto.voteType = null;

      await this.voteService.update(isVoteExist.id, createVoteDto.voteType);
      return {
        message: 'Update vote success!',
        status: 200,
      };
    }

    return this.voteService.create(createVoteDto, req.user);
  }

  @Get()
  async findAll() {
    return this.voteService.findAll();
  }

  @Get('/:questionId/question')
  async findVoteByQuestionId(@Param('questionId') questionId: number) {
    return this.voteService.findVoteByQuestionId(questionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getVoteStatus(@Query() query, @Req() req) {
    const questionId = query['questionId'];
    const vote = await this.voteService.getVoteStatus(req.user.id, questionId);

    return {
      statusVote: vote.voteType,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.voteService.findById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateVoteDto: UpdateVoteDto) {
    await this.voteService.update(id, updateVoteDto.voteType);

    return {
      message: 'Update vote successful',
      status: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.voteService.remove(+id);

    return {
      message: 'Delete vote successful',
      status: 200,
    };
  }
}
