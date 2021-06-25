import { uploadConfig } from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import { TmpImageController } from '../controllers/TmpImageController';

const uploadRoutes = Router();
const tmpImageController = new TmpImageController();

const uploadMiddleware = multer(uploadConfig.multerOptions);

uploadRoutes.put(
  '/',
  uploadMiddleware.single('image'),
  tmpImageController.create,
);

uploadRoutes.delete(
  '/:filename',
  celebrate({
    [Segments.PARAMS]: {
      filename: Joi.string().required(),
    },
  }),
  tmpImageController.delete,
);

export { uploadRoutes };
