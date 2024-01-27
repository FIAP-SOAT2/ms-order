import { CreateOrderInterface } from '../../../../application/interfaces/use-cases/order/CreateOrderInterface';
import { CreateOrder } from '../../../../application/use-cases/order/CreateOrder';
import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';
import { OrderProductsRepository } from '../../../../infra/database/repositories/OrderProductsRepository';

export const makeCreateOrder = (): CreateOrderInterface => {
  const orderRepository = new OrderRepository();
  const orderProductRepository = new OrderProductsRepository();
  return new CreateOrder(orderRepository, orderProductRepository);
};
