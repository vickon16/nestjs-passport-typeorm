import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('user')
  async findOne(@Request() req: RequestUser) {
    return await this.userService.findOne(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Get('user/:id')
  async findOneById(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('user')
  async updateUser(@Request() req: RequestUser, @Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(req.user.userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('user')
  async deleteUser(@Request() req: RequestUser) {
    return await this.userService.deleteUser(req.user.userId);
  }
}
