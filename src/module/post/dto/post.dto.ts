import { IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  tagName: string;
}
