import { GetOrderByFiltersController } from './GetOrderByFiltersController';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';
import { GetOrderByFiltersInterface } from '../../../../application/interfaces/use-cases/order/GetOrderByFiltersInterface';

describe('GetOrderByFiltersController', () => {
  let getOrderByFiltersController: GetOrderByFiltersController;
  let mockGetOrderByFilters: jest.Mocked<GetOrderByFiltersInterface>;

  beforeEach(() => {
    mockGetOrderByFilters = {
      execute: jest.fn(),
    };
    getOrderByFiltersController = new GetOrderByFiltersController(
      // assumindo que a validação sempre passa neste exemplo
      { validate: jest.fn() }, 
      mockGetOrderByFilters
    );
  });

  it('deve retornar status 200 e os pedidos quando encontrados', async () => {
    const mockOrders = [{ id: 'ABC123', status: 'PENDING', userId: 1, note: 'Remover cebola'}];
    mockGetOrderByFilters.execute.mockResolvedValue(mockOrders);

    const httpRequest = {
      query: { status: 'PENDING' }
    };
    
    const response = await getOrderByFiltersController.execute(httpRequest);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });

  it('deve retornar status 404 quando não encontrar pedidos', async () => {
    mockGetOrderByFilters.execute.mockResolvedValue(new OrderNotFoundError());

    const httpRequestErro = {
      query: { status: 'READY' }
    };
    const response = await getOrderByFiltersController.execute(httpRequestErro);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(new OrderNotFoundError());
  });
});
