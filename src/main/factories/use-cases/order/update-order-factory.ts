import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';
import { UpdateOrderInterface } from '@application/interfaces/use-cases/order/UpdateOrderInterface';
import { UpdateOrder } from '../../../../application/use-cases/order/UpdateOrder';
export const makeUpdateOrder = (): UpdateOrderInterface => {
  const orderRepository = new OrderRepository();
  return new UpdateOrder(orderRepository, orderRepository);
};
