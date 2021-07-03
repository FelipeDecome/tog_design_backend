import { Router } from 'express';

import { ThemesController } from '../controllers/ThemesController';

const themesRoutes = Router();
const themesController = new ThemesController();

themesRoutes.get('/', themesController.index);

export { themesRoutes };
