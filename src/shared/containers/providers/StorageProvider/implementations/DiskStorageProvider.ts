import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path';

import { IStorageProvider } from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string, is_temp?: boolean): Promise<void> {
    const filePath = path.resolve(
      is_temp ? uploadConfig.tmpFolder : uploadConfig.uploadsFolder,
      file,
    );

    try {
      await fs.promises.stat(filePath);
    } catch {
      throw new AppError('File not found', 404);
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
