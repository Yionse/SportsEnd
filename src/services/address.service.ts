import { Address } from '@/entities/Address.entities';
import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async getAddressList(userId?: number) {
    return await this.addressRepository.find({ where: { userId } });
  }

  async addAddress(address: Address) {
    await this.addressRepository.save(address);
  }
}
