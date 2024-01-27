import { UseCase } from '../UseCase';
import { OrderNotFoundError } from '../../../errors/order/OrderNotFoundError';
import { OrderEntity } from '@domain/entities/Order';
import { StatusEnum } from '@domain/enum/OrderEnum';
import { order_status_enum } from '@prisma/client';

export interface GetOrderByFiltersInterface extends UseCase<GetOrderByFiltersInterface.Request, GetOrderByFiltersInterface.Response> {
  execute(queryString: GetOrderByFiltersInterface.Request): Promise<GetOrderByFiltersInterface.Response>;
}

export namespace GetOrderByFiltersInterface {
  export type Request = { status?: order_status_enum };
  export type Response = OrderEntity[] | OrderNotFoundError;
}
