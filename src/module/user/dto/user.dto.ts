import { IsNotEmpty, IsIn, IsEmail } from 'class-validator';
import { Role } from 'src/model/user.entity';

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

  @IsIn([...Object.values(Role)])
  role: Role;
}
