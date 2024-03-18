import dotenv from 'dotenv';
import setupApp from './main/config/app';
import AwsSQS from './infra/aws/sqs.consumer';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 4003}`, 10);
const app = setupApp();

async function startSQSConsumer() {
  const sqsConsumer = new AwsSQS();

  try {
    await sqsConsumer.consumeFromQueue();
  } catch (error) {
    console.error('Failed to consume from SQS:', error);
  }
}
setInterval(startSQSConsumer, 10000);

app.listen(PORT, () => {
  startSQSConsumer();
  console.log(`Server is running on port ${PORT}`);
});
