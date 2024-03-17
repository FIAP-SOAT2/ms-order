import { events } from '../../application/constants/constants';
import AWS from 'aws-sdk';
import { EventSubscriber, On } from 'event-dispatch';

const defaultRegion = process.env.AWS_REGION || 'eu-central-1';

@EventSubscriber()
export default class AwsSns {
    private sns: AWS.SNS;

    constructor(region?: string) {
        const options: AWS.SNS.ClientConfiguration = {
            region: region || defaultRegion,
            endpoint: process.env.LOCALSTACK_URL || 'http://localhost:4566',
            credentials: {
                accessKeyId: 'dummy',
                secretAccessKey: 'dummy',
            }
        };

        this.sns = new AWS.SNS(options);
    }
    @On(`${events.order.insert}`)
    public async PublishToTopic(message: string): Promise<any> {
        const topicArn = process.env.TOPIC_CREATE_ORDER;
        const params = {
            Message: message,
            TopicArn: topicArn,
        };
        const data = await this.sns.publish(params).promise();
        console.log(data)
        return data;
    }
}


