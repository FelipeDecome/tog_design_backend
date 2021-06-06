import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().min(8).max(32).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(32).required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  usersController.create,
);

export { usersRoutes };
