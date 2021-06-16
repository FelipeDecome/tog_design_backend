import { articlesRoutes } from '@modules/articles/infra/http/routes/articles.routes';
import { categoriesRoutes } from '@modules/articles/infra/http/routes/categories.routes';
import { sessionsRoutes } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/articles', articlesRoutes);
routes.use('/categories', categoriesRoutes);

export { routes };
