const  { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const sqs = new SQSClient({});

const getRandomIntInclusive = (min, max) => {
  let minimum = Math.ceil(min);
  let maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum); // The maximum is inclusive and the minimum is inclusive
};

exports.handler = async event => {
  console.log(event);
  let message = "hello world";
  if (event.body) {
    const gson = JSON.parse(event.body);
    if (gson.message)
      message = gson.message;
  }

  const random_seconds = getRandomIntInclusive(0, 60 * 5);
  try {
    const res = await sqs.send(new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      DelaySeconds: random_seconds,
      MessageBody: message
    }));

    console.log(res.MessageId);
    return {
      statusCode: 200,
      body: `message added to the Queue with a delay: ${random_seconds} sec`
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}