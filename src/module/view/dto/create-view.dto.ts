import { IsNotEmpty } from 'class-validator';

export class CreateViewDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  questionId: number;
}
