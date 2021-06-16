import { IndexCategoriesService } from '@modules/articles/services/IndexCategoriesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexCategoriesService = container.resolve(IndexCategoriesService);

    const categories = await indexCategoriesService.execute();

    return response.json(categories);
  }
}

export { CategoriesController };
