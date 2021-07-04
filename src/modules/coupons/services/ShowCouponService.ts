import { AppError } from '@shared/errors/AppError';
import { isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { ICouponsRepository } from '../repositories/ICouponsRepository';

interface IRequest {
  coupon: string;
  user_id: string;
}

interface IResponse {
  id: string;
  coupon: string;
  discount: number;
  expiration_date: Date;
  is_valid: boolean;
  already_used: boolean;
}

@injectable()
class ShowCouponService {
  constructor(
    @inject('CouponsRepository')
    private couponsRepository: ICouponsRepository,
  ) {}

  public async execute({ coupon, user_id }: IRequest): Promise<IResponse> {
    const findCoupon = await this.couponsRepository.findByCoupon(coupon);

    if (!findCoupon) throw new AppError('Coupon not found');

    const usedByUser = await this.couponsRepository.findIfUsedByUser({
      id: findCoupon.id,
      user_id,
    });

    const isExpired = isAfter(findCoupon.expiration_date, new Date());

    return {
      ...findCoupon.couponToClient(),
      is_valid: isExpired && !usedByUser,
      already_used: usedByUser,
    };
  }
}

export { ShowCouponService };
