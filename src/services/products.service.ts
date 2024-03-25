import { Product } from '@/entities/Products.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getOneCategoryGoods(oneCategory?: number) {
    return await this.productRepository.find({
      where: { oneCategoryId: oneCategory },
    });
  }

  async getTwoCategoryGoods(twoCategory?: number) {
    return await this.productRepository.find({
      where: { twoCategoryId: twoCategory },
    });
  }
}
