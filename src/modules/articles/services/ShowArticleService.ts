import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { AppError } from '@shared/errors/AppError';
import { limitTextSize } from '@shared/utils/limitTextSize';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id?: string;
  id: string;
}

interface ICategoryResponse {
  id: string;
  name: string;
}

interface IThemeResponse {
  id: string;
  name: string;
}

interface IArticleReponse {
  id: string;
  title: string;
  text: string;
  price: number;
  author_id: string;
  author_name: string;
  cover_url: string;
  category: ICategoryResponse;
  themes: IThemeResponse[];
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

    const {
      text: article_text,
      themes,
      category,
      ...rest
    } = article.articleToClient();

    let findBoughtArticle;

    if (user_id)
      findBoughtArticle = await this.articlesRepository.findBoughtArticle({
        article_id: id,
        user_id,
      });

    const text = findBoughtArticle
      ? article_text
      : `${limitTextSize(article_text, 1 / 5)}...`;

    return {
      article: {
        ...rest,
        text,
        category: {
          id: category.id,
          name: category.name,
        },
        themes: themes.map(theme => theme.themeToClient()),
      },
      bought: !!findBoughtArticle,
    };
  }
}

export { ShowArticleService };
