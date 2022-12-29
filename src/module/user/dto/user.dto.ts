import { IsNotEmpty, IsIn, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  name: string;

  phone: string;

  avatar: string;

  interestedTags: string;

  @IsIn(['ADMIN', 'DEVELOPER', 'CUSTOMER', 'MAINTAINER'])
  role: string;
}

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  interestedTags: string;
}
