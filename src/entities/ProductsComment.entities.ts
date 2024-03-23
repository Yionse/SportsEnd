// products-comment.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsComment {
  @PrimaryGeneratedColumn()
  commentID: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ length: 100, nullable: false, default: '' })
  commentName: string;

  @Column({ length: 13, nullable: false, default: '' })
  createTime: string;
}
