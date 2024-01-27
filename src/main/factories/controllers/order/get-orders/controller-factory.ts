import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetOrdersController } from '../../../../../infra/http/controllers/order/GetOrdersController';
import { makeGetOrders } from '../../../use-cases/order/get-orders-factory';

export const makeGetOrdersController = (): BaseController => {
  const useCase = makeGetOrders();
  return new GetOrdersController(useCase);
};
