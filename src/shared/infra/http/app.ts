import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/containers';

import { uploadConfig } from '@config/upload';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { appErrorHandlingMiddleware } from './middlewares/appErrorHandlingMiddleware';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use(appErrorHandlingMiddleware);

export { app };
