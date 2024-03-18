import { SNS } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface MessagePublisher {
  publish(message: string, topicArn: string): Promise<PromiseResult<SNS.PublishResponse, AWS.AWSError>>;
}

export interface IAwsSns {
  PublishToTopic: (message: string, topic: string) => Promise<any>;
}
