#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DevOpsWithAIStack } from '../lib/devopswithai-stack';

const app = new cdk.App();

new DevOpsWithAIStack(app, 'DevOpsWithAIStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'DevOpsWithAI S3 + CloudFront Static Hosting Stack (Zero-Cost)',
});

app.synth();
