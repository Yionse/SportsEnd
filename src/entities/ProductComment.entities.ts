import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('productComment')
export class ProductComment {
  @PrimaryColumn('int', { name: 'id' })
  id?: number;

  @Column('int', { name: 'productId' })
  productId: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('varchar', { name: 'content', length: 100 })
  content: string;

  @Column('char', { name: 'createTime', length: 13 })
  createTime: string;
}
