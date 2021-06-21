import { ListUserBoughtArticlesSevice } from '@modules/articles/services/ListUserBoughtArticlesSevice';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BoughtArticlesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserBoughtArticlesService = container.resolve(
      ListUserBoughtArticlesSevice,
    );

    const articles = await listUserBoughtArticlesService.execute({
      user_id,
    });

    return response.json(articles);
  }
}

export { BoughtArticlesController };
