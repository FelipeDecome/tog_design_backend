import { joiConfig } from '@config/joi';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { OrdersController } from '../controllers/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

const JoiArrayWithCustomMessages = Joi.array().prefs({
  messages: joiConfig.customMessages,
});

const JoiStringWithCustomMessages = Joi.string().prefs({
  messages: joiConfig.customMessages,
});

ordersRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        article_ids: JoiArrayWithCustomMessages.min(1)
          .required()
          .items(Joi.string().uuid()),
        coupon: JoiStringWithCustomMessages.optional(),
      },
    },
    { abortEarly: false },
  ),
  ensureAuthenticated,
  ordersController.create,
);

export { ordersRoutes };
