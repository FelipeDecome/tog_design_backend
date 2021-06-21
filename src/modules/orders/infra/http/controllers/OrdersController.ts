import { CreateOrderService } from '@modules/orders/services/CreateOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { article_ids } = request.body;

    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute({
      user_id,
      article_ids,
    });

    return response.status(201).json(order);
  }
}

export { OrdersController };
