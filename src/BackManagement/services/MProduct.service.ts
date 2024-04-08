import { Product } from '@/entities/Products.entities';
import { ProductService } from '@/services/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MProductService {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // 获取所有商品
  async getAllProduct() {
    return await this.productService.getOneCategoryGoods();
  }

  async updateProduct(product: Product) {
    const oldProduct = await this.productService.getIdProduct(
      product.productID,
    );
    Object.assign(oldProduct, product);
    await this.productRepository.save(oldProduct);
  }
}
