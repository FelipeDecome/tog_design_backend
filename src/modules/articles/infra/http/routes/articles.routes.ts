import { uploadConfig } from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { verifyAuthenticated } from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import { Router } from 'express';
import multer from 'multer';

import { ArticlesController } from '../controllers/ArticlesController';
import { BoughtArticlesController } from '../controllers/BoughtArticlesController';

const articlesRoutes = Router();
const articlesController = new ArticlesController();
const boughtArticlesController = new BoughtArticlesController();

const uploadMiddleware = multer(uploadConfig);

articlesRoutes.post(
  '/',
  ensureAuthenticated,
  uploadMiddleware.single('cover'),
  articlesController.create,
);
articlesRoutes.get('/', ensureAuthenticated, articlesController.showByAuthor);

articlesRoutes.get(
  '/bought',
  ensureAuthenticated,
  boughtArticlesController.index,
);

articlesRoutes.get('/:id', verifyAuthenticated, articlesController.show);

export { articlesRoutes };
