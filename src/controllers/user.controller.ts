import { User } from '@/entities/Users.entities';
import { UserServices } from '@/services/user.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

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
}
