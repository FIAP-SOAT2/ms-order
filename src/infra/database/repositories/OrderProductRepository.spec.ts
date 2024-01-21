import { OrderProductsRepository } from './OrderProductsRepository';
import { prisma } from '../orm/prisma';

jest.mock('../orm/prisma', () => ({
  prisma: {
    orderProduct: {
      create: jest.fn(),
    },
  },
}));

describe('OrderProductsRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create order products', async () => {
    const orderProductsData = [
      {
        orderId: 'order1',
        productId: 'product1',
        quantity: 2,
        price: 10.0,
      },
      {
        orderId: 'order2',
        productId: 'product2',
        quantity: 3,
        price: 15.0,
      },
    ];

    const orderProductsRepository = new OrderProductsRepository();
    await orderProductsRepository.createOrderProducts(orderProductsData);

    expect(prisma.orderProduct.create).toHaveBeenCalledTimes(orderProductsData.length);

    orderProductsData.forEach((element, index) => {
      expect(prisma.orderProduct.create).toHaveBeenNthCalledWith(
        index + 1,
        {
          data: {
            orderId: element.orderId,
            productId: element.productId,
            quantity: element.quantity,
            price: element.price,
          },
        }
      );
    });
  });

});
