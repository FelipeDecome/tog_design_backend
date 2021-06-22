import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { Order } from '../infra/typeorm/entities/Order';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
}

export { IOrdersRepository };
