import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  article_ids: string[];
  total: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({ article_ids }: IRequest): Promise<void> {
    const articles = await this.articlesRepository.findByIds(article_ids);

    const foundIds = articles.map(article => article.id);

    let notFoundArticleIds: string[];

    article_ids.forEach(article_id => {
      if (foundIds.includes(article_id)) notFoundArticleIds.push(article_id);
    });
  }
}

export { CreateOrderService };
