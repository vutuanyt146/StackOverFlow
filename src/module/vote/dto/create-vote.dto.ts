import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import { VoteType } from 'src/model/vote.entity';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsNumberString()
  questionId: number;

  @IsNotEmpty()
  @IsIn([...Object.values(VoteType)])
  voteType: VoteType;
}
