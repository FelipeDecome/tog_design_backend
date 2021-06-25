import { DeleteTmpImageService } from '@modules/upload/services/DeleteTmpImageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TmpImageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { originalname, filename } = request.file;

    return response.json({ originalname, filename });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { filename } = request.params;

    const deleteTmpImageService = container.resolve(DeleteTmpImageService);

    await deleteTmpImageService.execute({
      filename,
    });

    return response.send();
  }
}

export { TmpImageController };
