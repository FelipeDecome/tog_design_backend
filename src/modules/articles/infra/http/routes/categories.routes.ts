import { Router } from 'express';

import { CategoriesController } from '../controllers/CategoriesController';

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.get('/', categoriesController.index);

export { categoriesRoutes };