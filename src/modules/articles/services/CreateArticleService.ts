import { Article } from '@modules/articles/infra/typeorm/entities/Article';
import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { ICategoriesRepository } from '@modules/articles/repositories/ICategoriesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  author_id: string;
  title: string;
  text: string;
  themes: string[];
  category_id: string;
}

@injectable()
class CreateArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    author_id,
    title,
    text,
    themes,
    category_id,
  }: IRequest): Promise<Article> {
    const findAuthor = await this.usersRepository.findById(author_id);

    if (!findAuthor) throw new AppError('Author not found.');

    const findCategory = await this.categoriesRepository.findById(category_id);

    if (!findCategory) throw new AppError('Category not found.');

    const findArticle = await this.articlesRepository.findByTitle(title);

    if (findArticle) throw new AppError('Title already in use.');

    const parsedThemes = themes.sort().join('|');

    const article = await this.articlesRepository.create({
      author_id,
      title,
      text,
      themes: parsedThemes,
      category_id,
    });

    return article;
  }
}

export { CreateArticleService };
