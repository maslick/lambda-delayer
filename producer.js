const  { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const sqs = new SQSClient({});


exports.handler = async event => {
  let sqs_url = process.env.SQS_QUEUE_URL;
  console.log(sqs_url);
  console.log(event);

  try {
    const res = await sqs.send(new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      DelaySeconds: 60,
      MessageBody: "hello world"
    }));

    console.log(res.MessageId);
    return {
      statusCode: 200,
      body: `message added to the Queue`
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}