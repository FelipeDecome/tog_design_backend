import { inject, injectable } from 'tsyringe';

import { IArticlesRepository } from '../repositories/IArticlesRepository';

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
  author_id: string;
  author_name: string;
  cover_url: string;
  category: ICategoryResponse;
  themes: IThemeResponse[];
}

@injectable()
class ListArticlesService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute(): Promise<IArticleReponse[]> {
    const articles = await this.articlesRepository.findAllArticles();

    return articles.map(article => {
      const { text, themes, category, author, price, ...rest } =
        article.articleToClient();

      return {
        ...rest,
        author_name: author.name,
        category: {
          id: category.id,
          name: category.name,
        },
        themes: themes.map(theme => theme.themeToClient()),
      };
    });
  }
}

export { ListArticlesService };
