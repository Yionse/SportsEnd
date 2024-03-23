import { User } from '@/entities/Users.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(user: User) {
    // 先判断当前是否存在当前用户
    const isCreate =
      (
        await this.userRepository.find({
          where: { userName: user.userName },
        })
      ).length === 0;
    if (isCreate) {
      let newUser = new User();
      newUser = { ...user, createTime: +new Date() + '' };
      await this.userRepository.save(newUser);
      return true;
    } else {
      return false;
    }
  }

  async login({ userName, password }: User) {
    return await this.userRepository.findOne({
      where: {
        userName,
        password,
      },
    });
  }
}
