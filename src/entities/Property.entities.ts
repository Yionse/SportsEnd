// property.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  propertyId: number;

  @Column({ length: 30, nullable: false, default: '' })
  propertyName: string;

  @Column({ length: 100, nullable: false, default: '', comment: '属性值列表' })
  propertyList: string;
}
