import 'reflect-metadata';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/containers';

import cors from 'cors';
import express from 'express';

import { appErrorHandlingMiddleware } from './middlewares/appErrorHandlingMiddleware';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(appErrorHandlingMiddleware);

export { app };
