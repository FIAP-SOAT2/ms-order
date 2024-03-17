import AwsSQS from "./sqs.consumer";

async function startSQSConsumer() {
    const sqsConsumer = new AwsSQS();
  
    try {
      await sqsConsumer.consumeFromQueue();
    } catch (error) {
      console.error('Failed to consume from SQS:', error);
    }
  }

export default startSQSConsumer;