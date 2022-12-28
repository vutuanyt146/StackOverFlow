import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'libs/mail/mail.service';
import { User } from 'src/model/user.entity';
import { Random } from 'util/random';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

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

  async login(body: AuthLoginDto) {
    const user = await User.findOne({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      throw new HttpException(
        'Username or password invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { username: body.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: AuthRegisterDto) {
    const random = new Random();
    const randomCodeVerify = random.randomCodeVerify(14);

    const user = await User.findOne({
      where: {
        username: body.username,
      },
    });

    if (!!user) {
      throw new HttpException(
        `Your username is use with email ${(await user).email}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await User.create({
      username: body.username,
      password: body.password,
      email: body.email,
      code_verify: randomCodeVerify,
    });

    this.mailService.sendMail(body.email, randomCodeVerify);

    return {
      status: 200,
      message:
        'Register successful! Please verify your email is active your account!',
    };
  }

  async verifyMail(email: string, codeVerify: string) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        'This email has not been use with any username',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.code_verify != codeVerify) {
      throw new HttpException('Your code is invalid!', HttpStatus.BAD_REQUEST);
    }

    await User.update(
      {
        is_active: true,
      },
      {
        where: {
          email: email,
        },
      },
    );

    return {
      status: 200,
      message: 'Your mail is verified!',
    };
  }
}
