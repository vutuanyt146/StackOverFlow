import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  textContent?: string;

  @IsOptional()
  codeContent?: string;

  @IsOptional()
  tagName: string;
}
