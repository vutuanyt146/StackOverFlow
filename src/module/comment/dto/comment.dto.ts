import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  content: string;

  commentId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;
}
