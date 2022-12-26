import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(body: AuthDto) {
    const payload = { username: body.username, sub: body.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
