import { GetOrderByFiltersController } from './GetOrderByFiltersController';
import { GetOrderByFiltersInterface } from '../../../../application/interfaces/use-cases/order/GetOrderByFiltersInterface';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';
import { Validation } from '../../../../infra/http/interfaces/Validation';

const mockValidation: jest.Mocked<Validation> = {
  validate: jest.fn(),
};

const mockGetOrderByFilters: jest.Mocked<GetOrderByFiltersInterface> = {
  execute: jest.fn(),
};

const mockHttpRequest: GetOrderByFiltersController.Request = {
  query: {
    status: 'PENDING',
  },
};
const mockHttpRequestError: GetOrderByFiltersController.Request = {
  query: {
    status: 'PROCESSING',
  },
};
describe('GetOrderByFiltersController', () => {
  let getOrderByFiltersController: GetOrderByFiltersController;

  beforeEach(() => {
    getOrderByFiltersController = new GetOrderByFiltersController(mockValidation, mockGetOrderByFilters);
  });

  it('deve retornar status 200 e a lista de pedidos quando encontrados', async () => {
    const fakeOrders = [{ id: 'ABC123', status: 'PENDING', userId: 1, note: 'Remover cebola' }];
    mockValidation.validate.mockReturnValue(null);
    mockGetOrderByFilters.execute.mockResolvedValue(fakeOrders);

    const result = await getOrderByFiltersController.execute(mockHttpRequest);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(fakeOrders);
    expect(mockGetOrderByFilters.execute).toHaveBeenCalledWith({ status: 'PENDING' });
  });
});
