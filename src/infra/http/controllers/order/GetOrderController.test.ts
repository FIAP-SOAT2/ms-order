import { GetOrdersController } from './GetOrdersController';
import { GetOrdersInterface } from '@application/interfaces/use-cases/order/GetOrdersInterface';

describe('GetOrdersController', () => {
  let getOrdersController: GetOrdersController;
  let mockGetOrders: jest.Mocked<GetOrdersInterface>;

  beforeEach(() => {
    mockGetOrders = {
      execute: jest.fn(),
    };
    getOrdersController = new GetOrdersController(mockGetOrders);
  });

  it('deve retornar status 200 e a lista de pedidos', async () => {
    const dataorders = { id: 'ABC223', status: 'PENDING', userMail: 'johnDoe@mail.com',userPhone:'12341561', note: 'Remover cebola' };
    mockGetOrders.execute.mockResolvedValue({ data: [dataorders], total: 1, page: 1, totalPages: 1 });

    const httpRequest = {
      params: { page: 1 },
    };

    const response = await getOrdersController.execute(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data: [dataorders], total: 1, page: 1, totalPages: 1 });
  });
});
