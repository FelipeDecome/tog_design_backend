import { Article } from '@modules/articles/infra/typeorm/entities/Article';
import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { AppError } from '@shared/errors/AppError';
import { limitTextSize } from '@shared/utils/limitTextSize';
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

    const { author, cover, ...rest } = article;

    let findBoughtArticle;

    if (user_id)
      findBoughtArticle = await this.articlesRepository.findBoughtArticle({
        article_id: id,
        user_id,
      });

    const text = findBoughtArticle
      ? article.text
      : `${limitTextSize(article.text, 1 / 5)}...`;

    return {
      article: {
        ...rest,
        author_name: author.name,
        themes: article.themes.split('|'),
        text,
        cover_url: `${process.env.API_URL}/files/${cover}`,
      },
      bought: !!findBoughtArticle,
    };
  }
}

export { ShowArticleService };
