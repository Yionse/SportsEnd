// order.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ length: 1000, nullable: false, default: '' })
  products: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '1-支付成功 0-待支付 -1退款中 -2退款成功 -3换货',
  })
  status: number;

  @Column({ nullable: false })
  addressID: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ length: 13, nullable: false, default: '' })
  createTime: string;
}
