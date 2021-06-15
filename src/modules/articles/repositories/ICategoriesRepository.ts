import { Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  index(): Promise<Category[]>;
}

export { ICategoriesRepository };
