import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { notFound, ok } from '../../helpers/http';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';
import { GetOrderByFiltersInterface } from '../../../../application/interfaces/use-cases/order/GetOrderByFiltersInterface';
import { Validation } from '../../../../infra/http/interfaces/Validation';

export class GetOrderByFiltersController extends BaseController {
  constructor(
    private readonly getOrderByFiltersValidation: Validation,
    private readonly getOrderByFilters: GetOrderByFiltersInterface,
  ) {
    super(getOrderByFiltersValidation);
  }

  async execute(httpRequest: GetOrderByFiltersController.Request): Promise<GetOrderByFiltersController.Response> {
    const { status } = httpRequest.query!;
    const orderOrError = await this.getOrderByFilters.execute({ status });
    if (orderOrError instanceof OrderNotFoundError) {
      return notFound(orderOrError);
    }
    return ok(orderOrError);
  }
}

export namespace GetOrderByFiltersController {
  export type Request = HttpRequest<undefined, { status: string }>;
  export type Response = HttpResponse<GetOrderByFiltersInterface.Response>;
}
