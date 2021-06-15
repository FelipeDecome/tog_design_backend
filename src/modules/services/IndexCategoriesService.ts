import { Category } from '@modules/articles/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/articles/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    return this.categoriesRepository.index();
  }
}

export { IndexCategoriesService };
