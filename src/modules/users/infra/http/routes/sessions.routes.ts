import { joiConfig } from '@config/joi';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

const JoiStringWithCustomMessages = Joi.string().prefs({
  messages: joiConfig.customMessages,
});

sessionsRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        email: JoiStringWithCustomMessages.email().required(),
        password: JoiStringWithCustomMessages.required(),
      },
    },
    { abortEarly: false },
  ),
  sessionsController.create,
);

export { sessionsRoutes };
