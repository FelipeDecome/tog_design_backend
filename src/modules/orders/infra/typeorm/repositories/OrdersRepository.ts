import { ICreateOrderDTO } from '@modules/orders/dtos/ICreateOrderDTO';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';

import { Order } from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    return this.ormRepository.save(order);
  }
}

export { OrdersRepository };
