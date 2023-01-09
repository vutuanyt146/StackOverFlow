import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumberString()
  commentId: number;

  @IsNotEmpty()
  @IsNumberString()
  questionId: number;
}
