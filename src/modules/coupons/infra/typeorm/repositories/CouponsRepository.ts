import { ICreateCouponDTO } from '@modules/coupons/dtos/ICreateCoupon';
import { ICouponsRepository } from '@modules/coupons/repositories/ICouponsRepository';
import { getRepository, Repository } from 'typeorm';

import { Coupon } from '../entities/Coupon';

class CouponsRepository implements ICouponsRepository {
  private ormRepository: Repository<Coupon>;

  constructor() {
    this.ormRepository = getRepository(Coupon);
  }

  public async create(data: ICreateCouponDTO): Promise<Coupon> {
    const coupon = this.ormRepository.create(data);

    return this.ormRepository.save(coupon);
  }

  public async findByCoupon(coupon: string): Promise<Coupon | undefined> {
    return this.ormRepository.findOne({
      where: { coupon },
    });
  }
}

export { CouponsRepository };
