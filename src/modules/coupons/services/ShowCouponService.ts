import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Coupon } from '../infra/typeorm/entities/Coupon';
import { ICouponsRepository } from '../repositories/ICouponsRepository';

interface IRequest {
  coupon: string;
  user_id: string;
}

interface IResponse {
  coupon: Coupon;
  is_valid: boolean;
  already_used: boolean;
}

@injectable()
class ShowCouponService {
  constructor(
    @inject('CouponsRepository')
    private couponsRepository: ICouponsRepository,
  ) {}

  public async execute({ coupon }: IRequest): Promise<IResponse> {
    const findCoupon = await this.couponsRepository.findByCoupon(coupon);

    if (!findCoupon) throw new AppError('Coupon not found');

    return {
      coupon: findCoupon,
      is_valid: true,
      already_used: false,
    };
  }
}

export { ShowCouponService };
