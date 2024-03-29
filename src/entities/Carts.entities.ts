// cart.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  cartsId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ length: 200, nullable: false, default: '' })
  picture: string;

  @Column({ length: 100, nullable: false, default: '' })
  productName: string;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  property: number;

  @Column({ nullable: false })
  price: number;
}
