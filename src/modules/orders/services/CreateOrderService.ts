import { IArticlesRepository } from '@modules/articles/repositories/IArticlesRepository';
import { ICouponsRepository } from '@modules/coupons/repositories/ICouponsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Order } from '../infra/typeorm/entities/Order';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

interface IRequest {
  user_id: string;
  article_ids: string[];
  coupon?: string;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('CouponsRepository')
    private couponsRepository: ICouponsRepository,
  ) {}

  public async execute({
    user_id,
    article_ids,
    coupon,
  }: IRequest): Promise<Order> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) throw new AppError('User not found');

    const userBoughtArticles =
      await this.articlesRepository.findAllUsersBoughtArticles(user_id);
    const userBoughtArticleIds = userBoughtArticles.map(article => article.id);

    const articles = await this.articlesRepository.findByIds(article_ids);
    const foundIds = articles.map(article => article.id);
    article_ids.forEach(article_id => {
      if (!foundIds.includes(article_id))
        throw new AppError('Some articles were not found.');

      if (userBoughtArticleIds.includes(article_id))
        throw new AppError('You can not buy an article you already have.');
    });

    let findCoupon;
    if (coupon) {
      findCoupon = await this.couponsRepository.findByCoupon(coupon);
    }

    const discount = findCoupon ? findCoupon.discount : 0;

    const articles_authors = articles.map(article => article.author_id);
    if (articles_authors.includes(user_id))
      throw new AppError('Authors can not buy their own articles');

    const total = articles.reduce(
      (acc, next) => Number(acc) + Number(next.price),
      0,
    );

    const totalWithDiscount = total - total * discount;

    const order = await this.ordersRepository.create({
      user_id,
      articles,
      coupon_id: findCoupon?.id,
      total: totalWithDiscount,
    });

    return order;
  }
}

export { CreateOrderService };
