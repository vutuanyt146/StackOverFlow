import { IsNotEmpty, IsIn } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  @IsIn(['ADMIN', 'DEVELOPER', 'CUSTOMER', 'MAINTAINER'])
  role: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: number;
}
