import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import { CouponsController } from '../controllers/CouponsController';

const couponsRoutes = Router();
const couponsController = new CouponsController();

couponsRoutes.post('/', couponsController.create);
couponsRoutes.get('/:coupon', ensureAuthenticated, couponsController.show);

export { couponsRoutes };
