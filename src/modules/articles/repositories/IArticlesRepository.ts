import { ICreateArticleDTO } from '../dtos/ICreateArticleDTO';
import { Article } from '../infra/typeorm/entities/Article';

interface IArticlesRepository {
  create(data: ICreateArticleDTO): Promise<Article>;
  findByTitle(title: string): Promise<Article | undefined>;
  findById(id: string): Promise<Article | undefined>;
  findByIds(ids: string[]): Promise<Article[]>;
  findByAuthorId(author_id: string): Promise<Article[]>;
  findAllUsersBoughtArticles(user_id: string): Promise<Article[]>;
}

export { IArticlesRepository };
