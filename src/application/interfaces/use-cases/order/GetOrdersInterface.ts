import { OrderEntity } from '@domain/entities/Order';
import { UseCase } from '../UseCase';

export interface GetOrdersInterface extends UseCase<GetOrdersInterface.Request, GetOrdersInterface.Response> {
  execute(params: GetOrdersInterface.Request): Promise<GetOrdersInterface.Response>;
}

export namespace GetOrdersInterface {
  export type Request = { page?: number };
  export type Response = { data: OrderEntity[]; page: number; total: number; totalPages: number };
}
