import { container } from 'tsyringe';

import { EtherialMailProvider } from './implementations/EtherialMailProvider';
import { IMailProvider } from './models/IMailProvider';

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherialMailProvider,
);
