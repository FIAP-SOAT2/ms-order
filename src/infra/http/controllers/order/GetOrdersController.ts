import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { BaseController } from '../BaseController';
import { GetOrdersInterface } from '@application/interfaces/use-cases/order/GetOrdersInterface';
import { ok } from '../../../http/helpers/http';

export class GetOrdersController extends BaseController {
  constructor(private readonly getOrders: GetOrdersInterface) {
    super();
  }

  async execute(httpRequest: GetOrdersController.Request): Promise<GetOrdersController.Response> {
    const { page } = httpRequest.params!;
    const response = await this.getOrders.execute({ page });
    return ok(response);
  }
}

export namespace GetOrdersController {
  export type Request = HttpRequest<undefined, { page?: number }>;
  export type Response = HttpResponse<GetOrdersInterface.Response>;
}
