import { CreateArticleService } from '@modules/articles/services/CreateArticleService';
import { ListAuthorArticlesService } from '@modules/articles/services/ListAuthorArticlesService';
import { ShowArticleService } from '@modules/articles/services/ShowArticleService';
import { parseMoneyToNumber } from '@shared/utils/parseMoneyToNumber';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ArticlesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: author_id } = request.user;
    const { title, text, themes, category_id, price } = request.body;

    const createArticleService = container.resolve(CreateArticleService);

    const article = await createArticleService.execute({
      author_id,
      title,
      text,
      themes,
      category_id,
      coverFileName: request.file.filename,
      price: parseMoneyToNumber(price),
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

  public async showByAuthor(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const author_id = request.user.id;

    const listAuthorArticlesService = container.resolve(
      ListAuthorArticlesService,
    );

    const articles = await listAuthorArticlesService.execute({
      author_id,
    });

    return response.json(articles);
  }
}

export { ArticlesController };
