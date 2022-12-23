import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  userId: number;

  tagName: string;
}
