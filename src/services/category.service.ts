import { OneCategory } from '@/entities/OneCategory.entities';
import { TwoCategory } from '@/entities/TwoCategory.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(OneCategory)
    private readonly oneCategoryRepository: Repository<OneCategory>,

    @InjectRepository(TwoCategory)
    private readonly twoCategoryRepository: Repository<TwoCategory>,
  ) {}

  async oneCategory() {
    return await this.oneCategoryRepository.find();
  }

  async twoCategory(oneCategory?: number) {
    return await this.twoCategoryRepository.find({
      where: { fatherCategory: oneCategory },
    });
  }
}
