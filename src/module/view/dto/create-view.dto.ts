import { IsNotEmpty } from 'class-validator';

export class CreateViewDto {
  @IsNotEmpty()
  questionId: number;
}
