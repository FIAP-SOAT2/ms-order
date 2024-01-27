import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetOrderByIdController } from '../../../../../infra/http/controllers/order/GetOrderByIdController';
import { makeGetOrderById } from './../../../../factories/use-cases/order/get-order-by-id-factory';

export const makeGetOrderByIdController = (): BaseController => {
  const useCase = makeGetOrderById();
  return new GetOrderByIdController(useCase);
};
