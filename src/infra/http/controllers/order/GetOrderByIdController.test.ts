import { GetOrderByIdController } from './GetOrderByIdController';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';
import { GetOrderByIdInterface } from '@application/interfaces/use-cases/order/GetOrderByIdInterface';

describe('GetOrderByIdController', () => {
  let getOrderByIdController: GetOrderByIdController;
  let mockGetOrderById: jest.Mocked<GetOrderByIdInterface>;

  beforeEach(() => {
    mockGetOrderById = {
      execute: jest.fn(),
    };
    getOrderByIdController = new GetOrderByIdController(mockGetOrderById);
  });

  it('deve retornar status 200 e o pedido quando encontrado', async () => {
    const mockOrder = { id: 'ABC123', status: 'PENDING', userMail: 'johnDoe@mail.com', note: 'Remover cebola' };
    mockGetOrderById.execute.mockResolvedValue(mockOrder);

    const httpRequest = {
      params: { id: 'ABC123' },
    };

    const response = await getOrderByIdController.execute(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });

  it('deve retornar status 404 quando o pedido não for encontrado', async () => {
    mockGetOrderById.execute.mockResolvedValue(new OrderNotFoundError());

    const httpRequest = {
      params: { id: '1' },
    };

    const response = await getOrderByIdController.execute(httpRequest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(OrderNotFoundError);
  });
});
