import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IThemesRepository } from '../repositories/IThemesRepository';

interface IRequest {
  author_id: string;
  title: string;
  text: string;
  themes: string[];
  coverFileName: string;
  price: number;
}

interface IThemeResponse {
  id: string;
  name: string;
}

interface IResponse {
  id: string;
  title: string;
  text: string;
  themes: IThemeResponse[];
}

@injectable()
class CreateArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    author_id,
    title,
    text,
    themes,
    coverFileName,
    price,
  }: IRequest): Promise<IResponse> {
    const findAuthor = await this.usersRepository.findById(author_id);

    if (!findAuthor) throw new AppError('Author not found.');

    const findArticle = await this.articlesRepository.findByTitle(title);

    if (findArticle) throw new AppError('Title already in use.');

    const findThemes = await this.themesRepository.findByNames(themes);

    const parsedThemes = themes.map(theme => {
      const themeExists = findThemes.find(
        findTheme =>
          !findTheme.name.localeCompare(theme, undefined, {
            sensitivity: 'base',
          }),
      );

      if (!themeExists) return { name: theme };

      return themeExists;
    });

    const filename = await this.storageProvider.saveFile(coverFileName);

    const article = await this.articlesRepository.create({
      author_id,
      title,
      text,
      cover: filename,
      themes: parsedThemes,
      price,
    });

    const { themes: article_themes, ...rest } = article.articleToClient();

    return {
      ...rest,
      themes: article_themes.map(theme => theme.themeToClient()),
    };
  }
}

export { CreateArticleService };
