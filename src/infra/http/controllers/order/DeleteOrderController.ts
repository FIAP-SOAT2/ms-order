import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { noContent, notFound } from '../../../../infra/http/helpers/http';
import { GetOrderByIdInterface } from '@application/interfaces/use-cases/order/GetOrderByIdInterface';
import { DeleteOrderInterface } from '@application/interfaces/use-cases/order/DeleteOrderInterface';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';

export class DeleteOrderController extends BaseController {
  constructor(
    private readonly getOrderById: GetOrderByIdInterface,
    private readonly deleteOrder: DeleteOrderInterface,
  ) {
    super();
  }

  async execute(httpRequest: DeleteOrderController.Request): Promise<DeleteOrderController.Response> {
    const { id } = httpRequest.params!;
    const orderOrError = await this.getOrderById.execute(id);
    if (orderOrError instanceof OrderNotFoundError) {
      return notFound(orderOrError);
    }
    await this.deleteOrder.execute(id);
    return noContent();
  }
}

export namespace DeleteOrderController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<undefined | OrderNotFoundError>;
}
