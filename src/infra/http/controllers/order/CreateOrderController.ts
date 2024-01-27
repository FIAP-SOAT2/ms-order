import { CreateOrderInterface } from '@application/interfaces/use-cases/order/CreateOrderInterface';
import { BaseController } from '../../controllers/BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';

export class CreateOrderController extends BaseController {
  constructor(
    private readonly createOrderValidation: Validation,
    private readonly createOrder: CreateOrderInterface,
  ) {
    super(createOrderValidation);
  }

  async execute(httpRequest: CreateOrderController.Request): Promise<CreateOrderController.Response> {
    const { userId, status, payment, paid, paidId, note, orderProducts } = httpRequest.body;
    const order = await this.createOrder.execute({ userId, status, payment, paid, paidId, note, orderProducts });
    if (!order) {
      return {
        statusCode: 400,
        body: { message: 'error to create order', name: 'Crete error validation' },
      };
    }
    return {
      statusCode: 201,
      body: order,
    };
  }
}

export namespace CreateOrderController {
  export type Request = HttpRequest<CreateOrderInterface.Request>;
  export type Response = HttpResponse<any>;
}
