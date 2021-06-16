import { container } from 'tsyringe';

import { ArticlesRepository } from '../infra/typeorm/repositories/ArticlesRepository';
import { CategoriesRepository } from '../infra/typeorm/repositories/CategoriesRepository';
import { IArticlesRepository } from '../repositories/IArticlesRepository';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

container.registerSingleton<IArticlesRepository>(
  'ArticlesRepository',
  ArticlesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
