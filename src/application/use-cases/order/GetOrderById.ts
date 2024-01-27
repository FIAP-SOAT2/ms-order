import { OrderNotFoundError } from '../../errors/order/OrderNotFoundError';
import { GetOrderByIdRepository } from '../../../application/interfaces/repositories/order/GetOrderByIdRepository';
import { GetOrderByIdInterface } from '@application/interfaces/use-cases/order/GetOrderByIdInterface';

export class GetOrderById implements GetOrderByIdInterface {
  constructor(private readonly getOrderByIdRepository: GetOrderByIdRepository) {}

  async execute(orderId: GetOrderByIdInterface.Request): Promise<GetOrderByIdInterface.Response> {
    const order = await this.getOrderByIdRepository.getOrderById(orderId);
    if (!order) {
      return new OrderNotFoundError();
    }
    return order;
  }
}
