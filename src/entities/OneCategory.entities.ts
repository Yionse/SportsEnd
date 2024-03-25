// one-category.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oneCategory')
export class OneCategory {
  @PrimaryGeneratedColumn()
  oneCategoryID: number;

  @Column({ length: 30, nullable: false, default: '' })
  categoryName: string;
}
