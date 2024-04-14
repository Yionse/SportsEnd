import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('admin')
export class AdminUser {
  @PrimaryColumn()
  admin: string;

  @Column('varchar', { length: 18 })
  pass: string;

  @Column('varchar', { length: 18 })
  user: string;
}
