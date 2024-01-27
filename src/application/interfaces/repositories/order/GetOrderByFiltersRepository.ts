import { OrderEntity } from '@domain/entities/Order';
import { StatusEnum } from '@domain/enum/OrderEnum';
import { order_status_enum } from '@prisma/client';

export interface GetOrderByFiltersRepository {
  getOrderByFilters(queryString: GetOrderByFiltersRepository.Request): Promise<GetOrderByFiltersRepository.Response>;
}

export namespace GetOrderByFiltersRepository {
  export type Request = { status: order_status_enum };
  export type Response = OrderEntity[] | null;
}
