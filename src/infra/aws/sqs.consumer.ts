import { UpdateOrderInterface } from '../../application/interfaces/use-cases/order/UpdateOrderInterface';
import { UpdateOrder } from '../../application/use-cases/order/UpdateOrder';
import { OrderRepository } from '../../infra/database/repositories/OrderRepository';
import AWS from 'aws-sdk';

const defaultRegion = process.env.AWS_REGION;
const queueUrl = process.env.PAYMENT_RESPONSE_QUEUE;

export default class AwsSQS {
  private sqs: AWS.SQS;
  constructor(
    private readonly updateOrderRepository?: UpdateOrder,
    region?: string,
  ) {
    const options: AWS.SQS.ClientConfiguration = {
      region: region || defaultRegion,
       endpoint: process.env.LOCALSTACK_URL || 'http://localhost:4566',
       credentials: {
       accessKeyId: 'dummy',
       secretAccessKey: 'dummy',
       }
    };
    const orderRepository = new OrderRepository();
    this.sqs = new AWS.SQS(options);
    this.updateOrderRepository = new UpdateOrder(orderRepository, orderRepository);
  }

  async deleteMessage(receiptHandle) {
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    await this.sqs.deleteMessage(deleteParams).promise();
  }

  public async consumeFromQueue(): Promise<any> {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 5,
    };
    const data = await this.sqs.receiveMessage(params).promise();
    if (data.Messages.length === 0) {
      return;
    }
    const paymentStatus = JSON.parse(JSON.parse(data.Messages[0].Body).Message);

    const updateObject: UpdateOrderInterface.Request = {
      orderId: paymentStatus.orderId,
      orderData: {
        paid: paymentStatus.status,
        paidId: paymentStatus.id,
        status: paymentStatus.status === true ? 'READY' : 'PAYMENT_FAILED',
      },
    };
    await this.updateOrderRepository.execute(updateObject);
    await this.deleteMessage(data.Messages[0].ReceiptHandle);
    return data;
  }
}
