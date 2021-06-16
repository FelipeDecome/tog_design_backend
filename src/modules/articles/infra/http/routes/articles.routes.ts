import { uploadConfig } from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { verifyAuthenticated } from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import { Router } from 'express';
import multer from 'multer';

import { ArticlesController } from '../controllers/ArticlesController';

const articlesRoutes = Router();
const articlesController = new ArticlesController();

const uploadMiddleware = multer(uploadConfig);

articlesRoutes.post(
  '/',
  ensureAuthenticated,
  uploadMiddleware.single('cover'),
  articlesController.create,
);
articlesRoutes.get('/', ensureAuthenticated, articlesController.showByAuthor);
articlesRoutes.get('/:id', verifyAuthenticated, articlesController.show);

export { articlesRoutes };
