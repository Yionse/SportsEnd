// product.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  productID: number;

  @Column({ length: 200, nullable: false, default: '' })
  productName: string;

  @Column({ length: 200, nullable: false, default: '' })
  description: string;

  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'double', nullable: true, comment: '活动价' })
  activePrice: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: false, comment: '一级分类' })
  oneCategoryId: number;

  @Column({ nullable: false, comment: '二级分类' })
  twoCategoryId: number;

  @Column({ length: 200, nullable: false, default: '' })
  url: string;

  @Column({ length: 30, nullable: false, default: '', comment: '属性列表' })
  property: string;
}
