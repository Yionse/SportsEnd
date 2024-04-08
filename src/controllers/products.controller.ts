import { Cart } from '@/entities/Carts.entities';
import { ProductComment } from '@/entities/ProductComment.entities';
import { CartService } from '@/services/carts.service';
import { ProductCommentService } from '@/services/productComment.service';
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
    private readonly commentService: ProductCommentService,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(ProductComment)
    private readonly commentRepository: Repository<ProductComment>,
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

  @Get('/search')
  async search(@Query() { key }: { key: string }, @Res() res: Response) {
    console.log(key);
    const result = await this.productService.search(key);
    res.customerSend('搜索商品成功', HttpStatus.OK, result);
  }

  @Get('/commentList')
  async getComment(
    @Query() { productId }: { productId: number },
    @Res() res: Response,
  ) {
    res.customerSend(
      '获取当前商品评论成功',
      HttpStatus.OK,
      await this.commentService.getList(productId),
    );
  }

  @Post('/addComment')
  async addComment(
    @Body() productComment: ProductComment,
    @Res() res: Response,
  ) {
    console.log(productComment);
    await this.commentRepository.save(productComment);
    res.customerSend('添加评论成功', HttpStatus.OK, {});
  }
}
