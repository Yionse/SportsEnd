// twoCategory.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('twoCategory')
export class TwoCategory {
  @PrimaryGeneratedColumn()
  twoCategoryID: number;

  @Column({ length: 30, nullable: false, default: '' })
  categoryName: string;

  @Column()
  fatherCategory: number;
}
