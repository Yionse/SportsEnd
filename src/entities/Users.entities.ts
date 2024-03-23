// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ length: 30, nullable: false, default: '' })
  userName: string;

  @Column({ length: 16, nullable: false, default: '' })
  password: string;

  @Column({ length: 13, nullable: false, default: '' })
  phoneNumber: string;

  @Column({ length: 13, nullable: false, default: '' })
  createTime: string;
}
