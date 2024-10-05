import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginType } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(input: LoginType) {
    const user = await this.userService.findOneByEmail(input.email);
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      return null;
    }

    return user;
  }

  generateToken(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '60s',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }
}
