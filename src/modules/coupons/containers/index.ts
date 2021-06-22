import { container } from 'tsyringe';

import { CouponsRepository } from '../infra/typeorm/repositories/CouponsRepository';
import { ICouponsRepository } from '../repositories/ICouponsRepository';

container.registerSingleton<ICouponsRepository>(
  'CouponsRepository',
  CouponsRepository,
);
