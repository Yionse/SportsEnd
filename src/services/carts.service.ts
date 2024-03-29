import { Cart } from '@/entities/Carts.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartService: Repository<Cart>,
  ) {}

  async addCart(product: Cart) {
    await this.cartService.save(product);
  }

  async getCartList(userId: number) {
    return this.cartService.find({ where: { userId } });
  }
}
