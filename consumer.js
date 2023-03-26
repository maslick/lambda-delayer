const  { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const sns = new SNSClient({});


exports.handler = async event => {
  console.log(event["Records"][0]["body"]);

  try {
    const res = await sns.send(new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: JSON.stringify(event["Records"][0]["body"])
    }));

    console.log(res.MessageId);
    return {
      statusCode: 200,
      body: `message sent to SNS topic`
    }
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: 'Failed to send message to SNS topic'
    };
  }
}