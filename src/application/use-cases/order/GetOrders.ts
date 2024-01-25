import { GetOrdersRepository } from '../../interfaces/repositories/order/GetOrdersRepository';
import { GetOrdersInterface } from '@application/interfaces/use-cases/order/GetOrdersInterface';
import { paginationConfig } from '../../config/pagination';

export class GetOrders implements GetOrdersInterface {
  constructor(private readonly getOrdersRepository: GetOrdersRepository) {}

  async execute(params: GetOrdersInterface.Request): Promise<GetOrdersInterface.Response> {
    const { page } = params;
    const { paginationLimit } = paginationConfig;
    return this.getOrdersRepository.getOrders({
      page,
      paginationLimit,
    });
  }
}
