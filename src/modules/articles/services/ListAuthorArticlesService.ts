import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IArticlesRepository } from '../repositories/IArticlesRepository';

interface IRequest {
  author_id: string;
}

interface IResponse {
  id: string;
  title: string;
  text: string;
  price: number;
  author_id: string;
  cover_url: string;
}

@injectable()
class ListAuthorArticlesService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ author_id }: IRequest): Promise<IResponse[]> {
    const findAuthor = await this.usersRepository.findById(author_id);

    if (!findAuthor) throw new AppError('Author not found.');

    const articles = await this.articlesRepository.findByAuthorId(author_id);

    return articles.map(article => article.articleToClient());
  }
}

export { ListAuthorArticlesService };
