import { articlesRoutes } from '@modules/articles/infra/http/routes/articles.routes';
import { categoriesRoutes } from '@modules/articles/infra/http/routes/categories.routes';
import { themesRoutes } from '@modules/articles/infra/http/routes/themes.routes';
import { couponsRoutes } from '@modules/coupons/infra/http/routes/coupons.routes';
import { ordersRoutes } from '@modules/orders/infra/http/routes/orders.routes';
import { uploadRoutes } from '@modules/upload/infra/http/routes/upload.routes';
import { sessionsRoutes } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.use('/articles', articlesRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/themes', themesRoutes);

routes.use('/orders', ordersRoutes);
routes.use('/coupons', couponsRoutes);

routes.use('/upload', uploadRoutes);

export { routes };
