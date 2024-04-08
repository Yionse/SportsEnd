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
import { MOrderService } from '../services/MOrder.service';

@Controller('/MOrder')
export class MOrderController {
  constructor(private readonly mOrderService: MOrderService) {}

  @Get('list')
  async getOrderList(
    @Query() { status = '' }: { status?: string },
    @Res() res: Response,
  ) {
    res.customerSend(
      '获取订单列表',
      HttpStatus.OK,
      await this.mOrderService.getList(status),
    );
  }

  @Post('updateStatus')
  async updateOrderStatus(
    @Body() { orderId, status }: { orderId: number; status: string },
    @Res() res: Response,
  ) {
    await this.mOrderService.updateOrderStatus(orderId, status);
    res.customerSend('更改订单状态', HttpStatus.OK, {});
  }
}
