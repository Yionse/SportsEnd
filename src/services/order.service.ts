import { Order } from '@/entities/Orders.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from './address.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async addOrders(order: Order) {
    this.orderRepository.save(order);
  }

  async orderList(userId: number) {
    return this.orderRepository.find({ where: { userId } });
  }

  async changeStatus(orderId: number, status: number) {
    const order = await this.orderRepository.findOne({ where: { orderId } });
    order.status = status;
    await this.orderRepository.save(order);
  }
}
