import { GetOrderByIdRepository } from '../../../application/interfaces/repositories/order/GetOrderByIdRepository';
import { UpdateOrderRepository } from '../../interfaces/repositories/order/UpdateOrderRepository';
import { OrderNotFoundError } from '../../../application/errors/order/OrderNotFoundError';
import { UpdateOrderInterface } from '@application/interfaces/use-cases/order/UpdateOrderInterface';

export class UpdateOrder implements UpdateOrderInterface {
  constructor(
    private readonly getOrderByIdRepository: GetOrderByIdRepository,
    private readonly updateOrderRepository: UpdateOrderRepository,
  ) {}

  async execute(params: UpdateOrderInterface.Request): Promise<UpdateOrderInterface.Response> {
    const { orderId, orderData } = params;
    const order = await this.getOrderByIdRepository.getOrderById(orderId);

    if (!order) {
      return new OrderNotFoundError();
    }

    return this.updateOrderRepository.updateOrder({ orderId, orderData });
  }
}
