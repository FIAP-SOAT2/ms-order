import { CreateOrderInterface } from '../../../../application/interfaces/use-cases/order/CreateOrderInterface';
import { CreateOrder } from '../../../../application/use-cases/order/CreateOrder';
import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';
import { OrderProductsRepository } from '../../../../infra/database/repositories/OrderProductsRepository';
import AwsSns from '../../../../infra/aws/sns.publisher';

export const makeCreateOrder = (): CreateOrderInterface => {
  const orderRepository = new OrderRepository();
  const orderProductRepository = new OrderProductsRepository();
  const snsMessagePublisher = new AwsSns();
  return new CreateOrder(orderRepository, orderProductRepository, snsMessagePublisher);
};
