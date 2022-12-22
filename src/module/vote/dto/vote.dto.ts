import { IsIn, IsNotEmpty } from 'class-validator';

export class VoteDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  post_id: number;

  @IsNotEmpty()
  @IsIn(['UP VOTE', 'DOWN VOTE'])
  vote_type: string;
}
