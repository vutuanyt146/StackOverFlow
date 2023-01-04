import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  textContent: string;

  @IsNotEmpty()
  codeContent: string;

  @IsOptional()
  tagName: string;
}
