// address.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  addressID: number;

  @Column({ length: 100, nullable: false, default: '' })
  addressName: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phoneNumber: number;
}
