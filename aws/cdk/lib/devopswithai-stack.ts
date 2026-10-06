import * as path from 'path';
import {
  Stack,
  StackProps,
  RemovalPolicy,
  CfnOutput,
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface DevOpsWithAIStackProps extends StackProps {
  domainName?: string;
}

export class DevOpsWithAIStack extends Stack {
  constructor(scope: Construct, id: string, props?: DevOpsWithAIStackProps) {
    super(scope, id, props);

    const domainName = props?.domainName || 'devopswithai.in';
    const wwwDomain = `www.${domainName}`;

    // 1. Primary S3 Bucket named 'www.devopswithai.in' (Required by AWS S3 for CNAME routing)
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: wwwDomain,
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // SPA Routing fallback for /about, /services, etc.
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 2. Apex / Root S3 Bucket named 'devopswithai.in' (Redirects to www.devopswithai.in)
    const rootBucket = new s3.Bucket(this, 'RootBucket', {
      bucketName: domainName,
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      websiteRedirect: {
        hostName: wwwDomain,
        protocol: s3.RedirectProtocol.HTTP,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Path to the exact Vite production build
    const distPath = path.join(__dirname, '../../../dist');

    // 3. S3 Deployment: Automatically uploads dist/ to www.devopswithai.in bucket
    new s3deploy.BucketDeployment(this, 'DeploySite', {
      sources: [s3deploy.Source.asset(distPath)],
      destinationBucket: siteBucket,
      prune: true,
    });

    // 4. CloudFormation Outputs
    new CfnOutput(this, 'WwwWebsiteURL', {
      value: siteBucket.bucketWebsiteUrl,
      description: 'Live S3 Website URL for www.devopswithai.in',
    });

    new CfnOutput(this, 'RootWebsiteURL', {
      value: rootBucket.bucketWebsiteUrl,
      description: 'Redirect S3 Website URL for devopswithai.in',
    });
  }
}
