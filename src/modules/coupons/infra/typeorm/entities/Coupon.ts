import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

interface ICouponToClient {
  id: string;
  coupon: string;
  discount: number;
  expiration_date: Date;
}
@Entity('coupons')
class Coupon {
  @PrimaryColumn()
  id: string;

  @Column()
  coupon: string;

  @Column('numeric')
  discount: number;

  @Column({ type: 'timestamp with time zone' })
  expiration_date: Date;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'coupons_to_users',
    joinColumn: { name: 'coupon_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  used_by: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }

  public couponToClient(): ICouponToClient {
    const { id, coupon, discount, expiration_date } = this;

    return {
      id,
      coupon,
      discount: Number(discount),
      expiration_date,
    };
  }
}

export { Coupon };
