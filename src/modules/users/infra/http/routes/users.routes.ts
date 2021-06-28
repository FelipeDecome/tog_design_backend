import { joiConfig } from '@config/joi';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

const JoiStringWithCustomMessages = Joi.string().prefs({
  messages: joiConfig.customMessages,
});

usersRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: JoiStringWithCustomMessages.min(8).max(32).required(),
        email: JoiStringWithCustomMessages.email().required(),
        password: JoiStringWithCustomMessages.min(8).max(32).required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  usersController.create,
);

export { usersRoutes };
