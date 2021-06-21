import { inject, injectable } from 'tsyringe';

import { Article } from '../infra/typeorm/entities/Article';
import { IArticlesRepository } from '../repositories/IArticlesRepository';

@injectable()
class ListArticlesService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute(): Promise<Article[]> {
    return this.articlesRepository.findAllArticles();
  }
}

export { ListArticlesService };
