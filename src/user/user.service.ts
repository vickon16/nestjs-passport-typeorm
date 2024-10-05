import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcyrpt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly em: EntityManager,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) return null;
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const foundUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (!!foundUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await bcyrpt.hash(dto.password, 10);

    const newUser = this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });
    return await this.userRepo.save(newUser);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return await this.userRepo.update(id, dto);
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return await this.userRepo.delete(id);
  }
}
