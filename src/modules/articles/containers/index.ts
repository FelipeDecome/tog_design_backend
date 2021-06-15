import { container } from 'tsyringe';

import { CategoriesRepository } from '../infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
