interface ICreateArticleDTO {
  author_id: string;
  title: string;
  text: string;
  cover: string;
  themes: string;
  category_id: string;
  price: number;
}

export { ICreateArticleDTO };
