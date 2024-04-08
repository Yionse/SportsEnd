import { Property } from '@/entities/Property.entities';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

@Controller('/MProperty')
export class MPropertyController {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  @Get('list')
  async getPropertyList(@Res() res: Response) {
    const list = await this.propertyRepository.find();
    list.forEach((property) => {
      property['list'] = property.propertyList.split('-');
    });
    res.customerSend('查询属性列表成功', HttpStatus.OK, list);
  }

  @Post('add')
  async addPropertyList(@Body() property: Property, @Res() res: Response) {
    await this.propertyRepository.save(property);
    res.customerSend('新增属性成功', HttpStatus.OK, {});
  }

  @Post('update')
  async updatePropertyList(@Body() property: Property, @Res() res: Response) {
    await this.propertyRepository.save(property);
    res.customerSend('修改属性成功', HttpStatus.OK, {});
  }
}
