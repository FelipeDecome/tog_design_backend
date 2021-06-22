import { AppError } from '@shared/errors/AppError';
import { isBefore, parseISO } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Coupon } from '../infra/typeorm/entities/Coupon';
import { ICouponsRepository } from '../repositories/ICouponsRepository';

interface IRequest {
  coupon_name: string;
  discount: number;
  expiration_date: string;
}

@injectable()
class CreateCouponService {
  constructor(
    @inject('CouponsRepository')
    private couponsRepository: ICouponsRepository,
  ) {}

  public async execute({
    coupon_name,
    discount,
    expiration_date,
  }: IRequest): Promise<Coupon> {
    const findCoupon = await this.couponsRepository.findByCoupon(coupon_name);

    if (findCoupon) throw new AppError('Coupon name already in use.');

    const parsedExpirationDate = parseISO(expiration_date);

    const expiresInPast = isBefore(parsedExpirationDate, new Date());

    if (expiresInPast)
      throw new AppError('Expiration date can not be a past date.');

    const parsedDiscount = discount > 1 ? discount / 100 : discount;

    const coupon = await this.couponsRepository.create({
      coupon: coupon_name,
      discount: parsedDiscount,
      expiration_date: parsedExpirationDate,
    });

    return coupon;
  }
}

export { CreateCouponService };
