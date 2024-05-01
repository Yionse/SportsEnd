import { OneCategory } from '@/entities/OneCategory.entities';
import { TwoCategory } from '@/entities/TwoCategory.entities';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

@Controller('MCategory')
export class CategoryController {
  constructor(
    @InjectRepository(TwoCategory)
    private readonly towCategoryRepository: Repository<TwoCategory>,
    @InjectRepository(OneCategory)
    private readonly oneCategoryRepository: Repository<OneCategory>,
  ) {}
  @Get('list')
  async list(@Res() res: Response) {
    const one = await this.oneCategoryRepository.find();
    const two = await this.towCategoryRepository.find();
    two.forEach((item) => {
      item['oneName'] = one.find(
        (oneItem) => oneItem.oneCategoryID === item.fatherCategory,
      ).categoryName;
    });
    res.customerSend('查询分类成功', HttpStatus.OK, two);
  }

  @Get('one')
  async oneCategory(@Res() res: Response) {
    const one = await this.oneCategoryRepository.find();
    res.customerSend('查询一级分类', HttpStatus.OK, one);
  }

  @Post('add')
  async addCategory(@Body() newData: TwoCategory, @Res() res: Response) {
    const newCategory = new TwoCategory();
    newCategory.categoryName = newData.categoryName;
    newCategory.fatherCategory = newData.fatherCategory;
    await this.towCategoryRepository.save(newCategory);
    res.customerSend('新增成功', HttpStatus.OK, {});
  }
}
