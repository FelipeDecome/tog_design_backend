import { IndexThemesService } from '@modules/articles/services/IndexThemesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ThemesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexThemesService = container.resolve(IndexThemesService);

    const themes = await indexThemesService.execute();

    return response.json(themes);
  }
}

export { ThemesController };
