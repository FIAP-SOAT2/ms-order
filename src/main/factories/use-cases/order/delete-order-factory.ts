import { DeleteOrderInterface } from '@application/interfaces/use-cases/order/DeleteOrderInterface';
import { DeleteOrder } from '../../../../application/use-cases/order/DeleteOrder';
import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';

export const makeDeleteOrder = (): DeleteOrderInterface => {
  const orderRepository = new OrderRepository();
  return new DeleteOrder(orderRepository);
};
