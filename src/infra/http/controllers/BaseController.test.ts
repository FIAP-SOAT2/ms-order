import { BaseController } from './BaseController';
import { HttpRequest } from '../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../infra/http/interfaces/HttpResponse';
import { Validation } from '../../../infra/http/interfaces/Validation';

// Subclasse de teste
class TestController extends BaseController {
  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: { message: 'Executado com sucesso' },
    };
  }
}

describe('BaseController', () => {
  let testController: TestController;
  let mockValidation: jest.Mocked<Validation>;

  beforeEach(() => {
    mockValidation = {
      validate: jest.fn(),
    };
    testController = new TestController(mockValidation);
  });

  it('deve retornar erro 400 se a validação falhar', async () => {
    const httpRequest = { body: {} };
    const validationError = { message: 'error to create order', name: 'Crete error validation' };
    mockValidation.validate.mockReturnValue(validationError);

    const httpResponse = await testController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(validationError);
  });

  it('deve chamar execute e retornar a resposta se a validação passar', async () => {
    const httpRequest = { body: { valid: true } };
    mockValidation.validate.mockReturnValue(null);

    const httpResponse = await testController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ message: 'Executado com sucesso' });
  });

  it('deve retornar erro 500 se ocorrer um erro durante a execução', async () => {
    const httpRequest = { body: { valid: true } };
    mockValidation.validate.mockReturnValue(null);
    jest.spyOn(testController, 'execute').mockRejectedValueOnce(new Error('Erro inesperado'));

    const httpResponse = await testController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toHaveProperty('message', 'Internal server error');
  });
});
