import { ProductComment } from '@/entities/ProductComment.entities';
import { ProductService } from '@/services/products.service';
import { UserServices } from '@/services/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MCommentService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserServices,
    @InjectRepository(ProductComment)
    private readonly appRepository: Repository<ProductComment>,
  ) {}

  async getCommentList() {
    const products = await this.productService.getOneCategoryGoods();
    const users = await this.userService.getUserList();
    const comments = await this.appRepository.find();
    console.log(comments);
    console.log(users);

    comments.forEach((comment) => {
      comment['user'] =
        users.find((user) => user.userid === comment.userId)?.userName ||
        '已注销';
      const { productName, url } = products.find(
        (product) => product.productID === comment.productId,
      );
      comment['products'] = { productName, url };
    });

    return comments;
  }
}
