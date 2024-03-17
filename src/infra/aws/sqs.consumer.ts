import AWS from "aws-sdk";

const defaultRegion = process.env.AWS_REGION || 'eu-central-1';
const queueUrl = 'http://sqs.eu-central-1.localhost.localstack.cloud:4566/000000000000/dummy-queue2';

export default class AwsSQS {
    private sqs: AWS.SQS;

    constructor(region?: string) {
        const options: AWS.SQS.ClientConfiguration = {
            region: region || defaultRegion,
            endpoint: process.env.LOCALSTACK_URL || 'http://localhost:4566',
            credentials: {
                accessKeyId: 'dummy',
                secretAccessKey: 'dummy',
            }
        };

        this.sqs = new AWS.SQS(options);
    }

    async deleteMessage(receiptHandle) {
        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: receiptHandle,
        };
       const data = await this.sqs.deleteMessage(deleteParams).promise();
       if (data){
       }
      }

    public async consumeFromQueue(): Promise<any> {
        const params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 5,
        };
        const data = await this.sqs.receiveMessage(params).promise();
        console.log('data',data.Messages);
        if (data.Messages.length === 0) {
            console.log('No messages on queue')
            return;
        }
        await this.deleteMessage(data.Messages[0].ReceiptHandle);
        return data;
    }
}