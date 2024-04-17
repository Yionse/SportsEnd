import { User } from '@/entities/Users.entities';
import { UserServices } from '@/services/user.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userServices: UserServices,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('/register')
  async register(@Body() user: User, @Res() res: Response) {
    const isSuccess = await this.userServices.register(user);
    res.customerSend(`注册${isSuccess ? '成功' : '失败'}`, HttpStatus.OK, {
      isSuccess,
    });
  }

  @Post('/login')
  async login(@Body() user: User, @Res() res: Response) {
    const result = await this.userServices.login(user);
    res.customerSend(`登录${result ? '成功' : '失败'}`, HttpStatus.OK, result);
  }

  @Post('delete')
  async delete(@Body() { userid }: { userid: string }, @Res() res: Response) {
    await this.userRepository.delete(userid);
    res.customerSend('删除用户成功', HttpStatus.OK, {});
  }
}
