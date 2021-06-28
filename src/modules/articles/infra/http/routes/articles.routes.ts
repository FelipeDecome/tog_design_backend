import { joiConfig } from '@config/joi';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { verifyAuthenticated } from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ArticlesController } from '../controllers/ArticlesController';
import { BoughtArticlesController } from '../controllers/BoughtArticlesController';

const articlesRoutes = Router();
const articlesController = new ArticlesController();
const boughtArticlesController = new BoughtArticlesController();

const JoiStringWithCustomMessages = Joi.string().prefs({
  messages: joiConfig.customMessages,
});

const JoiArrayWithCustomMessages = Joi.array().prefs({
  messages: joiConfig.customMessages,
});

articlesRoutes.post(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        title: JoiStringWithCustomMessages.required(),
        text: JoiStringWithCustomMessages.required(),
        coverFileName: JoiStringWithCustomMessages.required(),
        themes: JoiArrayWithCustomMessages.min(1)
          .items(JoiStringWithCustomMessages)
          .required(),
        category_id: JoiStringWithCustomMessages.uuid().required(),
        price: JoiStringWithCustomMessages.required(),
      },
    },
    { abortEarly: false },
  ),
  articlesController.create,
);
articlesRoutes.get('/', ensureAuthenticated, articlesController.showByAuthor);
articlesRoutes.get('/all', articlesController.index);

articlesRoutes.get(
  '/bought',
  ensureAuthenticated,
  boughtArticlesController.index,
);

articlesRoutes.get(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: JoiStringWithCustomMessages.uuid().required(),
      },
    },
    { abortEarly: false },
  ),
  verifyAuthenticated,
  articlesController.show,
);

export { articlesRoutes };
