import { ICreateArticleDTO } from '@modules/articles/dtos/ICreateArticleDTO';
import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { getRepository, In, Repository } from 'typeorm';

import { Article } from '../entities/Article';

class ArticlesRepository implements IArticlesRepository {
  private ormRepository: Repository<Article>;

  constructor() {
    this.ormRepository = getRepository(Article);
  }

  public async create(data: ICreateArticleDTO): Promise<Article> {
    const article = this.ormRepository.create(data);

    return this.ormRepository.save(article);
  }

  public async findByTitle(title: string): Promise<Article | undefined> {
    return this.ormRepository.findOne({
      where: {
        title,
      },
      relations: ['author', 'category'],
    });
  }

  public async findById(id: string): Promise<Article | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['author', 'category'],
    });
  }

  public async findByIds(ids: string[]): Promise<Article[]> {
    return this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  public async findByAuthorId(author_id: string): Promise<Article[]> {
    return this.ormRepository.find({
      where: {
        author_id,
      },
    });
  }

  public async findAllUsersBoughtArticles(user_id: string): Promise<Article[]> {
    return this.ormRepository
      .createQueryBuilder('article')
      .select([
        'article.id as id',
        'author.id as author_id',
        'author.name as author_name',
        'article.title as title',
        'article.text as text',
        'article.themes as themes',
        'article.cover as cover',
        'order.created_at as bought_at',
      ])
      .leftJoin('article.author', 'author')
      .leftJoin('article.orders', 'order')
      .where('order.user_id = :id', { id: user_id })
      .getRawMany();
  }
}

export { ArticlesRepository };
