import { ICreateCouponDTO } from '../dtos/ICreateCoupon';
import { IFindIfUsedByUser } from '../dtos/IFindIfUsedByUser';
import { Coupon } from '../infra/typeorm/entities/Coupon';

interface ICouponsRepository {
  create(data: ICreateCouponDTO): Promise<Coupon>;
  findByCoupon(coupon: string): Promise<Coupon | undefined>;
  findIfUsedByUser(data: IFindIfUsedByUser): Promise<boolean>;
  save(coupon: Coupon): Promise<Coupon>;
}

export { ICouponsRepository };
