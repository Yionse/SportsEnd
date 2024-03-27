import { ProductService } from '@/services/products.service';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/new')
  async getNewProduct(@Res() res: Response) {
    res.customerSend(
      '查询列表成功',
      HttpStatus.OK,
      await this.productService.getNewProduct(),
    );
  }

  @Get('/hot')
  async getHotProduct(@Res() res: Response) {
    res.customerSend(
      '查询列表成功',
      HttpStatus.OK,
      await this.productService.getNewProduct(),
    );
  }

  @Get('/goods')
  async getProductList(@Res() res: Response) {
    res.customerSend(
      '查询列表成功',
      HttpStatus.OK,
      await this.productService.getProductList(),
    );
  }

  @Get('/detail')
  async getDetail(@Query() { id }: { id: string }, @Res() res: Response) {
    const response = await this.productService.getDetailData(Number(id));
    res.customerSend('查询详情成功', HttpStatus.OK, response);
  }
}
