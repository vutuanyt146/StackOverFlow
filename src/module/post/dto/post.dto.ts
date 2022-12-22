import { IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @IsOptional()
  readonly id: number;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly user_id: number;

  readonly tag_name: string;
}
