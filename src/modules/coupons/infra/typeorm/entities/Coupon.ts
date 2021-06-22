import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('coupons')
class Coupon {
  @PrimaryColumn()
  id: string;

  @Column()
  coupon: string;

  @Column('numeric')
  discount: number;

  @Column('timestamp')
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Coupon };
