import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { verifyAuthenticated } from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import { Router } from 'express';

import { ArticlesController } from '../controllers/ArticlesController';

const articlesRoutes = Router();
const articlesController = new ArticlesController();

articlesRoutes.post('/', ensureAuthenticated, articlesController.create);
articlesRoutes.get('/:id', verifyAuthenticated, articlesController.show);

export { articlesRoutes };
