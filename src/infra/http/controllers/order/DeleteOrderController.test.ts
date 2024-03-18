import { DeleteOrderController } from './DeleteOrderController';
import { GetOrderByIdInterface } from '@application/interfaces/use-cases/order/GetOrderByIdInterface';
import { DeleteOrderInterface } from '@application/interfaces/use-cases/order/DeleteOrderInterface';
import { OrderNotFoundError } from '../../../../application/errors/order/OrderNotFoundError';

describe('DeleteOrderController', () => {
  let deleteOrderController: DeleteOrderController;
  let mockGetOrderById: jest.Mocked<GetOrderByIdInterface>;
  let mockDeleteOrder: jest.Mocked<DeleteOrderInterface>;

  beforeEach(() => {
    mockGetOrderById = {
      execute: jest.fn(),
    };
    mockDeleteOrder = {
      execute: jest.fn(),
    };
    deleteOrderController = new DeleteOrderController(mockGetOrderById, mockDeleteOrder);
  });

  it('deve retornar noContent quando a ordem é excluída com sucesso', async () => {
    const mockHttpRequest = { params: { id: 'valid-id' } };

    mockGetOrderById.execute.mockResolvedValue({
      id: 'valid-id',
      userMail: 'johnDoe@mail.com',
      userPhone: '1234567890',
      note: 'Remover cebola',
      status: 'PENDING',
    });
    mockDeleteOrder.execute.mockResolvedValue(undefined);

    const response = await deleteOrderController.execute(mockHttpRequest);

    expect(response.statusCode).toBe(204);
    expect(mockGetOrderById.execute).toHaveBeenCalledWith('valid-id');
    expect(mockDeleteOrder.execute).toHaveBeenCalledWith('valid-id');
  });

  it('deve retornar notFound quando a ordem não é encontrada', async () => {
    const mockHttpRequest = { params: { id: 'invalid-id' } };

    mockGetOrderById.execute.mockResolvedValue(new OrderNotFoundError());

    const response = await deleteOrderController.execute(mockHttpRequest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(OrderNotFoundError);
    expect(mockDeleteOrder.execute).not.toHaveBeenCalled();
  });

  it('deve lidar com erros inesperados', async () => {
    const mockHttpRequest = { params: { id: 'error-id' } };
    const mockError = new Error('Erro inesperado');

    mockGetOrderById.execute.mockRejectedValue(mockError);

    await expect(deleteOrderController.execute(mockHttpRequest)).rejects.toThrow(mockError);

    expect(mockDeleteOrder.execute).not.toHaveBeenCalled();
  });
});
