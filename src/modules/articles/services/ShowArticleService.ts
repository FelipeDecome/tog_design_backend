import { Article } from '@modules/articles/infra/typeorm/entities/Article';
import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id?: string;
  id: string;
}

interface IArticleReponse
  extends Omit<Omit<Omit<Article, 'themes'>, 'author'>, 'cover'> {
  author_name: string;
  cover_url: string;
  themes: string[];
}

interface IResponse {
  article: IArticleReponse;
  bought: boolean;
}

@injectable()
class ShowArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<IResponse> {
    const article = await this.articlesRepository.findById(id);

    if (!article) throw new AppError('Article not found.');

    /**
     * Should users define the preview Size?
     * Move url parsing responsability to model
     */

    const { author, cover, ...rest } = article;

    return {
      article: {
        ...rest,
        author_name: author.name,
        themes: article.themes.split('|'),
        text: user_id ? article.text : `${article.text.slice(0, 500)}...`,
        cover_url: `${process.env.API_URL}/files/${cover}`,
      },
      bought: !!user_id,
    };
  }
}

export { ShowArticleService };
