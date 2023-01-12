import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  interestedTags: string;

  @IsOptional()
  location?: string;
}
