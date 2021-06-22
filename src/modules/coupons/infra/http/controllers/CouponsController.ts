import { CreateCouponService } from '@modules/coupons/services/CreateCouponService';
import { ShowCouponService } from '@modules/coupons/services/ShowCouponService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CouponsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { coupon_name, discount, expiration_date } = request.body;

    const createCouponService = container.resolve(CreateCouponService);

    const coupon = await createCouponService.execute({
      coupon_name,
      discount: Number(discount),
      expiration_date,
    });

    return response.status(201).json(coupon);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { coupon: coupon_name } = request.params;

    const showCouponService = container.resolve(ShowCouponService);

    const coupon = await showCouponService.execute({
      coupon: coupon_name,
      user_id,
    });

    return response.json(coupon);
  }
}

export { CouponsController };
