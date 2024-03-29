import { Order } from '@/entities/Orders.entities';
import { AddressService } from '@/services/address.service';
import { OrderService } from '@/services/order.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly addressService: AddressService,
  ) {}

  @Post('/add')
  async addOrder(@Body() order: Order, @Res() res: Response) {
    await this.orderService.addOrders(order);
    res.customerSend('支付成功', HttpStatus.OK, {});
  }

  @Get('/list')
  async orderList(
    @Query() { status, userId }: { status: number; userId: number },
    @Res() res: Response,
  ) {
    const addressList = await this.addressService.getAddressList(userId);
    const result = (await this.orderService.orderList(userId))
      .filter((item) => {
        if (status == 99) {
          return true;
        } else {
          return item.status == status;
        }
      })
      .map((item) => {
        return {
          ...item,
          address: addressList.find(
            (address) => address.addressID === item.addressID,
          ),
        };
      });
    res.customerSend('查询个人订单成功', HttpStatus.OK, result);
  }

  @Get('/changeStatus')
  async changeStatus(
    @Query() { orderId, status }: { orderId: number; status: number },
    @Res() res: Response,
  ) {
    await this.orderService.changeStatus(orderId, status);
    res.customerSend('修改订单状态成功', HttpStatus.OK, {});
  }
}
