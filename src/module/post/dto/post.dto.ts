import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  readonly content: string;

  tagName: string;
}
