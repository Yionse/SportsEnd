import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/products.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/category')
export class CateGoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get('/oneCategory')
  async oneCategory(@Res() res: Response) {
    const oneCategory = await this.categoryService.oneCategory();
    const twoCategory = await this.categoryService.twoCategory();
    const allProducts = await this.productService.getOneCategoryGoods();
    res.customerSend(
      '查询分类成功',
      HttpStatus.OK,
      oneCategory.map((item) => {
        return {
          id: item.oneCategoryID,
          name: item.categoryName,
          children: twoCategory
            .filter((items) => items.fatherCategory === item.oneCategoryID)
            .map((item) => {
              return { id: item.twoCategoryID, name: item.categoryName };
            }),
          goods: allProducts
            .filter((product) => product.oneCategoryId === item.oneCategoryID)
            .map((item) => {
              return {
                id: item.productID,
                picture: item.url,
                name: item.productName,
                desc: item.description,
                price: item.price,
              };
            })
            .slice(0, 9),
        };
      }),
    );
  }

  @Get('/one')
  async getOneCategory(@Query() { id }: { id: string }, @Res() res: Response) {
    const products = await this.productService.getOneCategoryGoods();
    res.customerSend('查询一级分类成功', HttpStatus.OK, {
      name: (await this.categoryService.oneCategory(Number(id)))[0]
        .categoryName,
      children: (await this.categoryService.twoCategory(Number(id))).map(
        (item) => {
          return {
            ...item,
            id: item.fatherCategory,
            name: item.categoryName,
            goods: products
              .filter((product) => product.twoCategoryId === item.twoCategoryID)
              .map((item) => {
                return {
                  ...item,
                  id: item.productID,
                  picture: item.url,
                  name: item.productName,
                  desc: item.description,
                  price: item.price,
                };
              })
              .slice(0, 5),
          };
        },
      ),
    });
  }

  @Get('/subFather')
  async getTwoCategory(@Query() { id }: { id: string }, @Res() res: Response) {
    res.customerSend(
      '获取父级数据成功',
      HttpStatus.OK,
      await this.categoryService.getTwoOneCategory(Number(id)),
    );
  }

  @Get('/twoCategory')
  async getTwoCategoryProduct(
    @Query() { id }: { id: string },
    @Res() res: Response,
  ) {
    console.log(id);

    res.customerSend(
      '查询二级数据成功',
      HttpStatus.OK,
      (await this.productService.getTwoCategoryGoods(Number(id))).map(
        (item) => {
          return {
            ...item,
            id: item.productID,
            picture: item.url,
            name: item.productName,
            desc: item.description,
            price: item.price,
          };
        },
      ),
    );
  }
}
