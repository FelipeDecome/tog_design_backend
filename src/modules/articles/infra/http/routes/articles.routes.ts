import { uploadConfig } from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { verifyAuthenticated } from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import { ArticlesController } from '../controllers/ArticlesController';
import { BoughtArticlesController } from '../controllers/BoughtArticlesController';

const articlesRoutes = Router();
const articlesController = new ArticlesController();
const boughtArticlesController = new BoughtArticlesController();

const uploadMiddleware = multer(uploadConfig.multerOptions);

articlesRoutes.post(
  '/',
  ensureAuthenticated,
  uploadMiddleware.single('cover'),
  celebrate(
    {
      [Segments.BODY]: {
        title: Joi.string().required(),
        text: Joi.string().required(),
        themes: Joi.array().min(1).items(Joi.string().required()).required(),
        category_id: Joi.string().uuid().required(),
        price: Joi.string().required(),
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
        id: Joi.string().uuid().required(),
      },
    },
    { abortEarly: false },
  ),
  verifyAuthenticated,
  articlesController.show,
);

export { articlesRoutes };
