import { events } from '../../application/constants/constants';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

import { EventSubscriber, On } from 'event-dispatch';

const snsClient = new SNSClient({ region: "us-east-1" });

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
    async sendSmsNotification(phoneNumber: string, message: string): Promise<void> {
        try {
            const availablePhone = '+55' + phoneNumber;
            const publishCommand = new PublishCommand({
                PhoneNumber: availablePhone,
                Message: message,
            });
            const response = await snsClient.send(publishCommand);
            console.log("Message sent! Message ID:", response.MessageId);
        } catch (error) {
            console.error("Failed to send the message:", error);
        }
    }}


