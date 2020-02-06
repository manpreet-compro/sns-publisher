const AWS = require('aws-sdk');
const awsConfig = require('./config')['AWS'];

const sns = new AWS.SNS({
  accessKeyId: process.env.S3_KEY || awsConfig.accessKey,
  secretAccessKey: process.env.S3_SECRET || awsConfig.secretKey,
  region: process.env.S3_SECRET || awsConfig.region
});

function publish(message, subject) {
  const params = {
    Message: message,
    TopicArn: 'arn:aws:sns:us-east-1:511129085097:test-topic'
  }
  if(subject) {
    params.Subject = subject;
  }
  return sns.publish(params).promise();
}

module.exports = {
  publish
};
