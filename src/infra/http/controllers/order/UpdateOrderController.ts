import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { notFound, ok } from '../../../../infra/http/helpers/http';
import { UpdateOrderInterface } from '../../../../application/interfaces/use-cases/order/UpdateOrderInterface';
import { GetOrderByIdInterface } from '../../../../application/interfaces/use-cases/order/GetOrderByIdInterface';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';
import { Validation } from '../../../../infra/http/interfaces/Validation';

export class UpdateOrderController extends BaseController {
  constructor(
    private readonly updateOrderValidation: Validation,
    private readonly getOrderById: GetOrderByIdInterface,
    private readonly updateOrder: UpdateOrderInterface,
  ) {
    super(updateOrderValidation);
  }

  async execute(httpRequest: UpdateOrderController.Request): Promise<UpdateOrderController.Response> {
    const { id } = httpRequest.params!;
    const { userMail, status, payment, paid, paidId, note, orderProducts } = httpRequest.body;

    const orderOrError = await this.getOrderById.execute(id);
    if (orderOrError instanceof OrderNotFoundError) {
      return notFound(orderOrError);
    }

    const updatedOrderOrError = await this.updateOrder.execute({
      orderId: id,
      orderData: {
        userMail,
        status,
        payment,
        paid,
        paidId,
        note,
        orderProducts,
      },
    });
    if (updatedOrderOrError instanceof OrderNotFoundError) {
      return notFound(updatedOrderOrError);
    }
    return ok(updatedOrderOrError);
  }
}

export namespace UpdateOrderController {
  export type Request = HttpRequest<UpdateOrderInterface.OrderDataType, { id: string }>;
  export type Response = HttpResponse<UpdateOrderInterface.Response | OrderNotFoundError>;
}
