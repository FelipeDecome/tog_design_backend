import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Article } from '../infra/typeorm/entities/Article';
import { IArticlesRepository } from '../repositories/IArticlesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserBoughtArticlesSevice {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Article[]> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) throw new AppError('User not found');

    const boughtArticles =
      await this.articlesRepository.findAllUsersBoughtArticles(user_id);

    return boughtArticles;
  }
}

export { ListUserBoughtArticlesSevice };
