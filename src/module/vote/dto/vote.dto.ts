import { IsIn, IsNotEmpty } from 'class-validator';

export class VoteDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  @IsIn(['UP VOTE', 'DOWN VOTE'])
  voteType: string;
}
