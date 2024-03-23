// twoCategory.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TwoCategory {
  @PrimaryGeneratedColumn()
  twoCategoryID: number;

  @Column({ length: 30, nullable: false, default: '' })
  categoryName: string;
}
