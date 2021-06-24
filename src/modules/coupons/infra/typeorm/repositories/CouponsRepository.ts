import { ICreateCouponDTO } from '@modules/coupons/dtos/ICreateCoupon';
import { IFindIfUsedByUser } from '@modules/coupons/dtos/IFindIfUsedByUser';
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
      relations: ['used_by'],
    });
  }

  public async findIfUsedByUser(data: IFindIfUsedByUser): Promise<boolean> {
    const result = await this.ormRepository
      .createQueryBuilder('coupon')
      .select(['coupon.id', 'user.id'])
      .leftJoin('coupon.used_by', 'user')
      .where('coupon.id = :id AND user.id = :user_id', { ...data })
      .getOne();

    return !!result;
  }

  public async save(coupon: Coupon): Promise<Coupon> {
    return this.ormRepository.save(coupon);
  }
}

export { CouponsRepository };
