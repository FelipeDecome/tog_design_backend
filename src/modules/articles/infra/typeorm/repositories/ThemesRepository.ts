import { IThemesRepository } from '@modules/articles/repositories/IThemesRepository';
import { getRepository, Raw, Repository } from 'typeorm';

import { Theme } from '../entities/Theme';

class ThemesRepository implements IThemesRepository {
  private ormReponsitory: Repository<Theme>;

  constructor() {
    this.ormReponsitory = getRepository(Theme);
  }

  public async create(): Promise<Theme> {
    const theme = this.ormReponsitory.create();

    return this.ormReponsitory.save(theme);
  }

  public async findByNames(names: string[]): Promise<Theme[]> {
    return this.ormReponsitory.find({
      where: {
        name: Raw(
          alias =>
            `LOWER(${alias}) IN(${names
              .map(name => `'${name.toLowerCase()}'`)
              .join(',')})`,
        ),
      },
    });
  }

  public async findAll(): Promise<Theme[]> {
    return this.ormReponsitory.find();
  }
}

export { ThemesRepository };
