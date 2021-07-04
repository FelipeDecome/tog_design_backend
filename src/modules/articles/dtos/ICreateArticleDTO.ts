import { Theme } from '../infra/typeorm/entities/Theme';

interface ICreateArticleDTO {
  author_id: string;
  title: string;
  text: string;
  cover: string;
  themes: Partial<Theme>[];
  price: number;
}

export { ICreateArticleDTO };
