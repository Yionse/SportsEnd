import { Cart } from '@/entities/Carts.entities';
import { CartService } from '@/services/carts.service';
import { ProductService } from '@/services/products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

@Controller('/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

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

  @Post('/cart')
  async addCart(
    @Body()
    goods: Cart,
    @Res() res: Response,
  ) {
    await this.cartService.addCart(goods);
    res.customerSend('加入购物车成功', HttpStatus.OK, {});
  }

  @Get('/cartList')
  async getCartList(
    @Query() { userId }: { userId: number },
    @Res() res: Response,
  ) {
    const cartList = await this.cartService.getCartList(userId);
    res.customerSend('获取购物车列表成功', HttpStatus.OK, cartList);
  }

  @Delete('/cart')
  async deleteCart(@Body() { ids }: { ids: number }, @Res() res: Response) {
    await this.cartRepository.delete(ids);
    res.customerSend('删除购物车成功', HttpStatus.OK, {});
  }
}
