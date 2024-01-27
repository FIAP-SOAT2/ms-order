import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { prisma } from '../orm/prisma';
export class OrderProductsRepository implements CreateOrderProductsRepository {
  async createOrderProducts(orderProductsData: any): Promise<void> {
    orderProductsData.forEach(async (element) => {
      await prisma.orderProduct.create({
        data: {
          orderId: element.orderId,
          productId: element.productId,
          quantity: element.quantity,
          price: element.price,
        },
      });
    });
  }
}
