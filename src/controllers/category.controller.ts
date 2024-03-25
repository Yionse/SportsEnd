import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/products.service';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
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
}
