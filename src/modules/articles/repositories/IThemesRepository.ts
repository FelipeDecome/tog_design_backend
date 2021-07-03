import { Theme } from '../infra/typeorm/entities/Theme';

interface ICreateThemeDTO {
  name: string;
}

interface IThemesRepository {
  create(data: ICreateThemeDTO): Promise<Theme>;
  findByNames(names: string[]): Promise<Theme[]>;
  findAll(): Promise<Theme[]>;
}

export { IThemesRepository };
