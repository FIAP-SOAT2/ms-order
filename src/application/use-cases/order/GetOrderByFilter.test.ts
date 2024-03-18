import { GetOrderByFiltersRepository } from '../../interfaces/repositories/order/GetOrderByFiltersRepository';
import { OrderEntity } from '@domain/entities/Order';
import { OrderNotFoundError } from '../../errors/order/OrderNotFoundError';
import { GetOrderByFilters } from './GetOrderByFilter';

describe('GetOrderByFilters', () => {
  let getOrderByFilters: GetOrderByFilters;
  let getOrderByFiltersRepository: jest.Mocked<GetOrderByFiltersRepository>;

  beforeEach(() => {
    getOrderByFiltersRepository = {
      getOrderByFilters: jest.fn(),
    } as jest.Mocked<GetOrderByFiltersRepository>;

    getOrderByFilters = new GetOrderByFilters(getOrderByFiltersRepository);
  });

  it('should return orders by filters successfully', async () => {
    const status = 'PENDING';
    const expectedOrder: OrderEntity = {
      id: 'sampleOrderId',
      userMail: 'johnDoe@mail.com',
      userPhone: '12301321',
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'PENDING',
      paid: true,
      paidId: 101522,
    };

    getOrderByFiltersRepository.getOrderByFilters.mockResolvedValue([expectedOrder]);

    const result = await getOrderByFilters.execute({ status });

    expect(getOrderByFiltersRepository.getOrderByFilters).toHaveBeenCalledWith({ status });
    expect(result).toEqual([expectedOrder]);
  });

  it('should return OrderNotFoundError when no orders are found', async () => {
    const status = 'PENDING';
    getOrderByFiltersRepository.getOrderByFilters.mockResolvedValue(null);

    const result = await getOrderByFilters.execute({ status });

    expect(getOrderByFiltersRepository.getOrderByFilters).toHaveBeenCalledWith({ status });
    expect(result).toBeInstanceOf(OrderNotFoundError);
  });
});
