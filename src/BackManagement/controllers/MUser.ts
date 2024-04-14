import { AdminUser } from '@/entities/Admin.entities';
import { User } from '@/entities/Users.entities';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Admin, Repository } from 'typeorm';

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminRepository: Repository<AdminUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  @Post('login')
  async login(
    @Body() { user, pass }: { user: string; pass: string },
    @Res() res: Response,
  ) {
    const result = await this.adminRepository
      .createQueryBuilder('admin')
      .where(pass)
      .andWhere('admin.user = :user OR admin.admin = :admin', {
        user,
        admin: user,
      })
      .getOne();
    console.log(result);
    res.customerSend(`登录${result?.admin ? '成功' : '失败'}`, HttpStatus.OK, {
      isLogin: result?.admin ? true : false,
    });
  }

  @Post('register')
  async register(@Body() admin: AdminUser, @Res() res: Response) {
    let newAdmin = new AdminUser();
    newAdmin = admin;
    await this.adminRepository.save(newAdmin);
    res.customerSend('注册成功', HttpStatus.OK, { isSuccess: true });
  }

  @Get('userList')
  async userList(@Res() res: Response) {
    const adminList = await this.adminRepository.find();
    const userList = await this.userRepository.find();
    res.customerSend('获取用户列表成功', HttpStatus.OK, {
      adminList,
      userList,
    });
  }
}
