import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetOrderById } from '../../../use-cases/order/get-order-by-id-factory';
import { makeUpdateOrder } from '../../../use-cases/order/update-order-factory';
import { UpdateOrderController } from '../../../../../infra/http/controllers/order/UpdateOrderController';
import { makeUpdateOrderValidation } from '../../../../../main/factories/controllers/order/update-order/validation-factory';

export const makeUpdateOrderController = (): BaseController => {
  const validation = makeUpdateOrderValidation();
  const getOrderByIdUseCase = makeGetOrderById();
  const updateOrderUseCase = makeUpdateOrder();
  return new UpdateOrderController(validation, getOrderByIdUseCase, updateOrderUseCase);
};
