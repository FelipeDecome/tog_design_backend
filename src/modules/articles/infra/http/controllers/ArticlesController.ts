import { CreateArticleService } from '@modules/articles/services/CreateArticleService';
import { ListArticlesService } from '@modules/articles/services/ListArticlesService';
import { ListAuthorArticlesService } from '@modules/articles/services/ListAuthorArticlesService';
import { ShowArticleService } from '@modules/articles/services/ShowArticleService';
import { parseMoneyToNumber } from '@shared/utils/parseMoneyToNumber';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ArticlesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: author_id } = request.user;
    const { title, text, coverFileName, themes, price } = request.body;

    const createArticleService = container.resolve(CreateArticleService);

    const article = await createArticleService.execute({
      author_id,
      title,
      text,
      themes,
      coverFileName,
      price: parseMoneyToNumber(price),
    });

    return response.status(201).json(article);
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

  public async index(request: Request, response: Response): Promise<Response> {
    const listArticlesService = container.resolve(ListArticlesService);

    const articles = await listArticlesService.execute();

    return response.json(articles);
  }
}

export { ArticlesController };
