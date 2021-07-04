import { ICategoriesRepository } from '@modules/articles/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IResponse {
  id: string;
  name: string;
}
@injectable()
class IndexCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<IResponse[]> {
    const categories = await this.categoriesRepository.index();

    return categories.map(category => ({
      id: category.id,
      name: category.name,
    }));
  }
}

export { IndexCategoriesService };
