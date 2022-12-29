import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'libs/mail/mail.service';
import { User } from 'src/model/user.entity';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    private userService: UserService,
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
    const user = await this.getAuthenticatedUser(body.username, body.password);

    if (user.is_enabled_two_factor_auth) {
    }

    const payload = {
      username: body.username,
      user_id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async register(body: AuthRegisterDto) {
    const randomCodeVerify = uuidv4();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: body.username }, { email: body.email }],
      },
    });

    if (!!user) {
      throw new HttpException(
        `Your username or email is used!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCreate = await User.create({
      username: body.username,
      password: hashedPassword,
      email: body.email,
      code_verify: randomCodeVerify,
    });
    userCreate.password = undefined;
    userCreate.code_verify = undefined;

    this.mailService.sendMail(body.email, randomCodeVerify);

    return {
      status: 200,
      message:
        'Register successful! Please click link in your email to active your account!',
      user: userCreate,
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
        code_verify: null,
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

  async getAuthenticatedUser(username: string, plainTextPassword: string) {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new HttpException('Username is invalid!', HttpStatus.BAD_REQUEST);
    }

    const isPassword = await bcrypt.compare(plainTextPassword, user.password);

    if (!isPassword) {
      throw new HttpException('Password is invalid!', HttpStatus.BAD_REQUEST);
    }
    user.password = undefined;

    return user;
  }

  public getCookieForLogOut() {
    return ['Authentication=', 'HttpOnly', 'Path=/', 'Max-Age=0'];
  }
}
