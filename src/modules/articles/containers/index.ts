import { container } from 'tsyringe';

import { ArticlesRepository } from '../infra/typeorm/repositories/ArticlesRepository';
import { ThemesRepository } from '../infra/typeorm/repositories/ThemesRepository';
import { IArticlesRepository } from '../repositories/IArticlesRepository';
import { IThemesRepository } from '../repositories/IThemesRepository';

container
  .registerSingleton<IArticlesRepository>(
    'ArticlesRepository',
    ArticlesRepository,
  )
  .registerSingleton<IThemesRepository>('ThemesRepository', ThemesRepository);
