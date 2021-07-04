import { ICreateArticleDTO } from '@modules/articles/dtos/ICreateArticleDTO';
import { IFindBoughtArticle } from '@modules/articles/dtos/IFindBoughtArticle';
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
    });
  }

  public async findById(id: string): Promise<Article | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['author', 'category', 'themes'],
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
      .leftJoin('article.author', 'author')
      .leftJoin('article.orders', 'order')
      .leftJoin('article.themes', 'theme')
      .where('order.user_id = :id', { id: user_id })
      .getMany();
  }

  public async findAllArticles(): Promise<Article[]> {
    return this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['author', 'category', 'themes'],
    });
  }

  public async findBoughtArticle({
    article_id,
    user_id,
  }: IFindBoughtArticle): Promise<Article | undefined> {
    return this.ormRepository
      .createQueryBuilder('article')
      .leftJoin('article.orders', 'order')
      .where('article.id = :article_id AND order.user_id = :user_id', {
        article_id,
        user_id,
      })
      .getOne();
  }
}

export { ArticlesRepository };
