import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Role } from 'src/model/user.entity';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  interestedTags: string;

  @IsOptional()
  role: Role;
}
