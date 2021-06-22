import { ICreateCouponDTO } from '../dtos/ICreateCoupon';
import { Coupon } from '../infra/typeorm/entities/Coupon';

interface ICouponsRepository {
  create(data: ICreateCouponDTO): Promise<Coupon>;
  findByCoupon(coupon: string): Promise<Coupon | undefined>;
}

export { ICouponsRepository };
