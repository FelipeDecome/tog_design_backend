import { CreateArticleService } from '@modules/articles/services/CreateArticleService';
import { ShowArticleService } from '@modules/articles/services/ShowArticleService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ArticlesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: author_id } = request.user;
    const { title, text, themes, category_id } = request.body;

    const createArticleService = container.resolve(CreateArticleService);

    const article = await createArticleService.execute({
      author_id,
      title,
      text,
      themes,
      category_id,
    });

    return response.json(article);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user?.id;
    const { id } = request.params;

    const showArticleService = container.resolve(ShowArticleService);

    const article = await showArticleService.execute({
      user_id,
      id,
    });

    return response.json(article);
  }
}

export { ArticlesController };
