import { Order } from '@/entities/Orders.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getList(status: string) {
    let query = {};
    if (status) {
      query = {
        status,
      };
    }
    return await this.orderRepository.find({ where: query });
  }

  async updateOrderStatus(orderId: number, status: string) {
    const currentOrder = await this.orderRepository.findOne({
      where: { orderId },
    });
    Object.assign(currentOrder, { status });
    await this.orderRepository.save(currentOrder);
  }
}
