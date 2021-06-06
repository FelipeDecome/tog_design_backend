import { container } from 'tsyringe';

import { JsonWebTokenJWTProvider } from './implementations/JsonWebTokenJWTProvider';
import { IJWTProvider } from './models/IJWTProvider';

container.registerSingleton<IJWTProvider>(
  'JWTProvider',
  JsonWebTokenJWTProvider,
);
