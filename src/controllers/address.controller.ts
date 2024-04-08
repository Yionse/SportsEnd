import { Address } from '@/entities/Address.entities';
import { AddressService } from '@/services/address.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

@Controller('/address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    @InjectRepository(Address)
    private readonly appRepository: Repository<Address>,
  ) {}

  @Get('/list')
  async getAddressList(
    @Query() { userId }: { userId: number },
    @Res() res: Response,
  ) {
    res.customerSend(
      '查询收货地址成功',
      HttpStatus.OK,
      await this.addressService.getAddressList(userId),
    );
  }

  @Post('/add')
  async addAddress(@Body() address: Address, @Res() res: Response) {
    this.addressService.addAddress(address);
    res.customerSend('添加地址成功', HttpStatus.OK, {});
  }

  @Get('/delete')
  async deleteAddress(
    @Query() { addressId }: { addressId: number },
    @Res() res: Response,
  ) {
    await this.appRepository.delete(addressId);
    res.customerSend('删除地址成功', HttpStatus.OK, {});
  }
}
