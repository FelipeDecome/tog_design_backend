import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { AppError } from '@shared/errors/AppError';
import { limitTextSize } from '@shared/utils/limitTextSize';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id?: string;
  id: string;
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
      author,
      ...rest
    } = article.articleToClient();

    let findBoughtArticle;

    if (user_id)
      findBoughtArticle = await this.articlesRepository.findBoughtArticle({
        article_id: id,
        user_id,
      });

    const text =
      findBoughtArticle || article.author_id === user_id
        ? article_text
        : `${limitTextSize(article_text, 1 / 5)}...`;

    return {
      article: {
        ...rest,
        author_name: author.name,
        text,

        themes: themes.map(theme => theme.themeToClient()),
      },
      bought: !!findBoughtArticle,
    };
  }
}

export { ShowArticleService };
