import { Property } from '@/entities/Property.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyService: Repository<Property>,
  ) {}

  async getAllPropertyList() {
    return await this.propertyService.find();
  }
}
