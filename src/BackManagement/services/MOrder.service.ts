import { Address } from '@/entities/Address.entities';
import { Order } from '@/entities/Orders.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async getList(status: string) {
    let query = {};
    if (status) {
      query = {
        status,
      };
    }
    const data = await this.orderRepository.find({ where: query });
    const addressList = await this.addressRepository.find();
    return data.map((order) => {
      return {
        ...order,
        address: addressList.find((item) => item.addressID === order.addressID),
      };
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    const currentOrder = await this.orderRepository.findOne({
      where: { orderId },
    });
    Object.assign(currentOrder, { status });
    await this.orderRepository.save(currentOrder);
  }
}
