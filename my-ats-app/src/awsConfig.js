// src/awsConfig.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'XXXXXXXXXX',   //Details hidden for security reasons
  secretAccessKey: 'XXXXXXXXXXXXX'   //Details hidden for security reasons
});

export default AWS;

