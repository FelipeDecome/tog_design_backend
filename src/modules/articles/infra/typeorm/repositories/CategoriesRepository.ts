import { ICategoriesRepository } from '@modules/articles/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async index(): Promise<Category[]> {
    return this.ormRepository.find();
  }
}

export { CategoriesRepository };
