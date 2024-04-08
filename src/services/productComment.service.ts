import { ProductComment } from '@/entities/ProductComment.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserServices } from './user.service';

@Injectable()
export class ProductCommentService {
  constructor(
    @InjectRepository(ProductComment)
    private readonly appRepository: Repository<ProductComment>,
    private readonly userService: UserServices,
  ) {}

  async getList(productId: number) {
    const commentList = await this.appRepository.find({ where: { productId } });
    const userList = await this.userService.getUserList();
    commentList.forEach((comment) => {
      const currentUser = userList.find(
        (user) => user.userid === comment.userId,
      );
      comment['userName'] = currentUser.userName;
    });
    return commentList;
  }
}
