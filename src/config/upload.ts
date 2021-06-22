import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const multerOptions: multer.Options = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(16).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed image type'));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};

const uploadConfig = {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multerOptions,
};

export { uploadConfig };
