import { events } from '../../application/constants/constants';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

import { EventSubscriber, On } from 'event-dispatch';

const snsClient = new SNSClient({ region: 'us-east-1' });

@EventSubscriber()
export default class AwsSns {
  @On(`${events.order.insert}`)
  public async PublishToTopic(message: string): Promise<any> {
    const topicArn = process.env.TOPIC_CREATE_ORDER;
    const publishCommand = new PublishCommand({
      Message: message,
      TopicArn: topicArn,
    });
    const response = await snsClient.send(publishCommand);
    return response;
  }

  @On(`${events.order.status}`)
  async sendSmsNotification(notification): Promise<void> {
    try {
      const availablePhone = '+55' + notification.phoneNumber;
      const publishCommand = new PublishCommand({
        PhoneNumber: availablePhone,
        Message: notification.message,
      });
      const response = await snsClient.send(publishCommand);
    } catch (error) {
      console.error('Failed to send the message:', error);
    }
  }
}
