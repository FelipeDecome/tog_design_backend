import { inject, injectable } from 'tsyringe';

import { IThemesRepository } from '../repositories/IThemesRepository';

interface IThemeResponse {
  id: string;
  name: string;
}

type TResponse = IThemeResponse[];

@injectable()
class IndexThemesService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute(): Promise<TResponse> {
    const themes = await this.themesRepository.findAll();

    return themes.map(theme => theme.themeToClient());
  }
}

export { IndexThemesService };
