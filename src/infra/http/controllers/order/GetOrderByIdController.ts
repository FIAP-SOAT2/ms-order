import { HttpRequest } from '../../../http/interfaces/HttpRequest';
import { HttpResponse } from '../../../http/interfaces/HttpResponse';
import { notFound, ok } from '../../../http/helpers/http';
import { BaseController } from '../../../http/controllers/BaseController';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';
import { GetOrderByIdInterface } from '@application/interfaces/use-cases/order/GetOrderByIdInterface';

export class GetOrderByIdController extends BaseController {
  constructor(private readonly getOrderById: GetOrderByIdInterface) {
    super();
  }

  async execute(httpRequest: GetOrderByIdController.Request): Promise<GetOrderByIdController.Response> {
    const { id } = httpRequest.params!;
    const orderOrError = await this.getOrderById.execute(id);

    if (orderOrError instanceof OrderNotFoundError) {
      return notFound(orderOrError);
    }
    return ok(orderOrError);
  }
}

export namespace GetOrderByIdController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<GetOrderByIdInterface.Response>;
}
