import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty } from 'class-validator';
import { VoteType } from 'src/model/vote.entity';
import { CreateVoteDto } from './create-vote.dto';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {
  @IsNotEmpty()
  @IsIn([...Object.values(VoteType)])
  voteType: VoteType;
}
