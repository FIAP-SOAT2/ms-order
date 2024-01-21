import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetOrderById } from '../../../../../main/factories/use-cases/order/get-order-by-id-factory';
import { makeDeleteOrder } from '../../../../../main/factories/use-cases/order/delete-order-factory';
import { DeleteOrderController } from '../../../../../infra/http/controllers/order/DeleteOrderController';

export const makeDeleteOrderController = (): BaseController => {
  const getOrderByIdUseCase = makeGetOrderById();
  const deleteOrderUseCase = makeDeleteOrder();

  return new DeleteOrderController(getOrderByIdUseCase, deleteOrderUseCase);
};
