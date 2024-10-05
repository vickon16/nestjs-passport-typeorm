import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { User } from 'src/entities/user.entity';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req: { user: User }) {
    return this.authService.generateToken(req.user);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    return this.authService.generateToken(user);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: User }) {
    return req.user;
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req: { user: User }) {
    const { access_token } = this.authService.generateToken(req.user);
    return { access_token };
  }
}
