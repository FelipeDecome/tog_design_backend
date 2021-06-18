import { Article } from '@modules/articles/infra/typeorm/entities/Article';

interface ICreateOrderDTO {
  user_id: string;
  articles: Article[];
  total: number;
}

export { ICreateOrderDTO };
