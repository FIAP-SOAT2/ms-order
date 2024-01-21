import { OrderEntity } from '@domain/entities/Order';

export interface GetOrdersRepository {
  getOrders(params: GetOrdersRepository.Request): Promise<GetOrdersRepository.Response>;
}

export namespace GetOrdersRepository {
  export type Request = { page: number; paginationLimit: number };
  export type Response = { data: OrderEntity[]; page: number; total: number; totalPages: number };
}
