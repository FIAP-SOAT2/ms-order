import { GetOrders } from '../../../../application/use-cases/order/GetOrders';
import { GetOrdersInterface } from '../../../../application/interfaces/use-cases/order/GetOrdersInterface';
import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';

export const makeGetOrders = (): GetOrdersInterface => {
  const orderRepository = new OrderRepository();
  return new GetOrders(orderRepository);
};
