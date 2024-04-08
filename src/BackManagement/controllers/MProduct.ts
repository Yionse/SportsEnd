import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MProductService } from '../services/MProduct.service';
import { Product } from '@/entities/Products.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 商品管理
@Controller('/MProduct')
export class MProductController {
  constructor(
    private readonly mProductService: MProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // 获取所有商品
  @Get('list')
  async getAllProduct(@Res() res: Response) {
    res.customerSend(
      '获取所有商品成功',
      HttpStatus.OK,
      await this.mProductService.getAllProduct(),
    );
  }

  // 修改商品
  @Post('update')
  async updateProduct(@Body() product: Product, @Res() res: Response) {
    await this.mProductService.updateProduct(product);
    res.customerSend('更新商品成功', HttpStatus.OK, {});
  }

  // 增加商品
  @Post('add')
  async addProduct(@Body() product: Product, @Res() res: Response) {
    await this.productRepository.save(product);
    res.customerSend('添加商品成功', HttpStatus.OK, {});
  }
}
