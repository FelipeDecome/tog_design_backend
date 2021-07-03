import { container } from 'tsyringe';

import { ArticlesRepository } from '../infra/typeorm/repositories/ArticlesRepository';
import { CategoriesRepository } from '../infra/typeorm/repositories/CategoriesRepository';
import { ThemesRepository } from '../infra/typeorm/repositories/ThemesRepository';
import { IArticlesRepository } from '../repositories/IArticlesRepository';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import { IThemesRepository } from '../repositories/IThemesRepository';

container
  .registerSingleton<IArticlesRepository>(
    'ArticlesRepository',
    ArticlesRepository,
  )
  .registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
  )
  .registerSingleton<IThemesRepository>('ThemesRepository', ThemesRepository);
