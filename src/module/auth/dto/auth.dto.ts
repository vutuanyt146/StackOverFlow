import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class AuthRegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class TwoFactorAuthCodeDto {
  @IsNotEmpty()
  codeVerify: string;
}
