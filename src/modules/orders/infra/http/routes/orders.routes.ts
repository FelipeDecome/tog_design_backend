import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { OrdersController } from '../controllers/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        article_ids: Joi.array()
          .min(1)
          .required()
          .items(Joi.string().uuid().required()),
      },
    },
    { abortEarly: false },
  ),
  ensureAuthenticated,
  ordersController.create,
);

export { ordersRoutes };
