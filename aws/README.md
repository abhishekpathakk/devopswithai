# AWS S3 static website hosting

This directory contains AWS deployment examples for the Vite frontend. The CDK stack in `aws/cdk/` deploys the built site directly to Amazon S3 static website hosting.

## S3 website behavior

The CDK stack creates two buckets:

- `www.<domain>` serves the website, with `index.html` as the SPA error fallback.
- `<domain>` redirects to the `www` bucket over HTTP.

Direct S3 website hosting requires public read access to the website objects. This is intentional for this hosting option. The stack does not create a CloudFront distribution or configure Origin Access Control. S3 website endpoints serve HTTP; use a separately configured HTTPS front end if HTTPS is required.

The buckets are configured to be retained when the CDK stack is deleted. Normal site deployments still upload the new build and prune stale files from the `www` bucket.

## Deploy with CDK

Build the frontend from the repository root:

```sh
npm ci
npm run build
```

Then deploy the CDK stack:

```sh
cd aws/cdk
npx cdk bootstrap
npx cdk deploy
```

Bootstrap is needed once per AWS account and region. Review the generated CloudFormation changes before deployment, especially if the stack already manages the site buckets.

The stack outputs the S3 website endpoints. Configure DNS for the apex and `www` names to point to the corresponding S3 website endpoints using DNS records supported by your provider. The apex bucket redirects to `www`.

## Alternative shell script

`aws/deploy.sh` is a separate S3 and CloudFront provisioning script. It does not use the CDK stack. Review its CloudFront origin access and S3 public access configuration before using it; the script is not the direct S3 website setup described above.

## Search API CORS

The search API keeps its existing CORS behavior unless `CORS_ORIGINS` is configured. Set it to a comma-separated list of exact browser origins when the API is hosted separately from the website, for example:

```sh
CORS_ORIGINS=https://devopswithai.in,https://www.devopswithai.in
```

CORS controls which browser origins can read API responses; it is not authentication or protection against direct HTTP clients.
