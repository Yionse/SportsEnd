// order.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ length: 2000, nullable: false, default: '' })
  products: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '1-支付成功 -1退款中 -2退款成功 -3换货',
  })
  status: number;

  @Column({ nullable: false })
  addressID: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ length: 13, nullable: false, default: '' })
  createTime: string;

  @Column({ nullable: false })
  allPrice: number;

  @Column({ nullable: false })
  allCount: number;
}
