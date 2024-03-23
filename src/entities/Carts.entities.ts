// cart.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartsId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ length: 100, nullable: false, default: '' })
  specification: string;
}
