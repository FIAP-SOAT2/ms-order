import { OrderNotFoundError } from '../../errors/order/OrderNotFoundError';
import { GetOrderByFiltersRepository } from '../../interfaces/repositories/order/GetOrderByFiltersRepository';
import { GetOrderByFiltersInterface } from '@application/interfaces/use-cases/order/GetOrderByFiltersInterface';

export class GetOrderByFilters implements GetOrderByFiltersInterface {
  constructor(private readonly getOrderByFiltersRepository: GetOrderByFiltersRepository) {}

  async execute(queryString: GetOrderByFiltersInterface.Request): Promise<GetOrderByFiltersInterface.Response> {
    const { status } = queryString;
    const order = await this.getOrderByFiltersRepository.getOrderByFilters({ status });
    if (!order || order.length === 0) {
      return new OrderNotFoundError();
    }

    return order;
  }
}
