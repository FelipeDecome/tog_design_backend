import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import { OrdersController } from '../controllers/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post('/', ensureAuthenticated, ordersController.create);

export { ordersRoutes };
