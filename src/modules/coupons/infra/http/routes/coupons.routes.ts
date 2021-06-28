import { joiConfig } from '@config/joi';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { CouponsController } from '../controllers/CouponsController';

const couponsRoutes = Router();
const couponsController = new CouponsController();

const JoiStringWithCustomErrorMessages = Joi.string().prefs({
  messages: joiConfig.customMessages,
});

const JoiNumberWithCustomErrorMessages = Joi.number().prefs({
  messages: joiConfig.customMessages,
});

const JoiDateWithCustomErrorMessages = Joi.date().prefs({
  messages: joiConfig.customMessages,
});

couponsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      coupon_name: JoiStringWithCustomErrorMessages.required(),
      discount: JoiNumberWithCustomErrorMessages.required(),
      expiration_date: JoiDateWithCustomErrorMessages.required(),
    },
  }),
  couponsController.create,
);
couponsRoutes.get('/:coupon', ensureAuthenticated, couponsController.show);

export { couponsRoutes };
