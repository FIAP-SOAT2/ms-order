import { OrderRepository } from '../../../../infra/database/repositories/OrderRepository';
import { GetOrderByFiltersInterface } from '@application/interfaces/use-cases/order/GetOrderByFiltersInterface';
import { GetOrderByFilters } from '../../../../application/use-cases/order/GetOrderByFilter';

export const makeGetOrderByFilters = (): GetOrderByFiltersInterface => {
  const orderRepository = new OrderRepository();
  return new GetOrderByFilters(orderRepository);
};
