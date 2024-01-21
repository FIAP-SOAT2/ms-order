import { GetOrderByIdInterface } from '@application/interfaces/use-cases/order/GetOrderByIdInterface';
import { GetOrderById } from '../../../../application/use-cases/order/GetOrderById';
import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';

export const makeGetOrderById = (): GetOrderByIdInterface => {
  const orderRepository = new OrderRepository();
  return new GetOrderById(orderRepository);
};
