const AWS = require('aws-sdk');
const awsConfig = require('./config')['AWS'];

const sns = new AWS.SNS({
  accessKeyId: process.env.S3_KEY || awsConfig.accessKey,
  secretAccessKey: process.env.S3_SECRET || awsConfig.secretKey,
  region: process.env.REGION || awsConfig.region
});

function publish(message, subject) {
  const params = {
    Message: message,
    TopicArn: process.env.TOPICARN || awsConfig.topicArn
  }
  if(subject) {
    params.Subject = subject;
  }
  return sns.publish(params).promise();
}

module.exports = {
  publish
};
