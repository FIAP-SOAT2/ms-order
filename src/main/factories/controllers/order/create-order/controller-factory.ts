import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { CreateOrderController } from '../../../../../infra/http/controllers/order/CreateOrderController';
import { makeCreateOrderValidation } from '../../../../../main/factories/controllers/order/create-order/validation-factory';
import { makeCreateOrder } from '../../../use-cases/order/create-order-factory';

export const makeCreateOrderController = (): BaseController => {
  const validation = makeCreateOrderValidation();
  const createOrderUseCase = makeCreateOrder();
  const data = new CreateOrderController(validation, createOrderUseCase);
  return data;
};
