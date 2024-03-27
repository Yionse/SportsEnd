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

  // 获取一级分类列表
  async oneCategory(oneCategory?: number) {
    return await this.oneCategoryRepository.find({
      where: { oneCategoryID: oneCategory },
    });
  }

  // 按照一级分类获取当前的二级分类
  async twoCategory(twoCategory?: number) {
    return await this.twoCategoryRepository.find({
      where: { fatherCategory: twoCategory },
    });
  }

  // 获取二级分类及其father分类
  async getTwoOneCategory(twoCategory: number) {
    const oneCategory = await this.oneCategory();
    const currentTwoCategory = await this.twoCategoryRepository.findOne({
      where: { twoCategoryID: twoCategory },
    });
    const fatherCategory = oneCategory.find(
      (item) => item.oneCategoryID === currentTwoCategory.fatherCategory,
    );
    return {
      parentName: fatherCategory?.categoryName,
      parentId: fatherCategory?.oneCategoryID,
      name: currentTwoCategory.categoryName,
      id: currentTwoCategory?.twoCategoryID,
    };
  }
}
