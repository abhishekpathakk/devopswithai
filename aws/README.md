# 🌐 DevOpsWithAI - AWS Zero-Cost Static Site Deployment

> **Important**: All existing GCP configurations (`k8s/`, `deploy.sh`, etc.) remain **100% intact and untouched**. This AWS setup lives independently in `aws/`.

---

## 💡 Why This Approach? (Zero Cost & 100% Serverless)

1. **Zero Cost / AWS Free Tier**:
   - No expensive GKE/EKS clusters or EC2 instances running 24/7 (saves $30–$75+/month).
   - **CloudFront**: 1 TB data transfer out + 10,000,000 requests free every month forever.
   - **S3**: 5 GB storage free tier.
2. **Sub-Pages Work Flawlessly (SPA Routing Fallback)**:
   - Configured with CloudFront Custom Error Responses (`404` and `403` -> `/index.html` with status `200`).
   - Refreshing or directly opening any sub-page (`/about`, `/industrial-training`, `/services/ai`) works seamlessly without 404 errors.
3. **Automated S3 Upload & Cache Invalidation**:
   - The CDK stack bundles the Vite `dist/` directory, uploads it to S3, and invalidates CloudFront edge caches in a single command.

---

## ⚡ Method 1: Deploy with AWS CDK (Recommended)

### 1. Build the Vite Frontend
From the repository root:
```bash
npm run build
```

### 2. Bootstrap CDK (Only needed once per AWS account/region)
```bash
cd aws/cdk
npx cdk bootstrap
```

### 3. Deploy the Stack
```bash
npx cdk deploy
```

That's it! CDK will:
- Provision the encrypted S3 bucket.
- Provision the CloudFront distribution with Origin Access Control (OAC).
- Configure SPA routing for all sub-pages.
- Automatically upload `dist/` into S3.
- Invalidate CloudFront cache.
- Print your live site URL in the terminal outputs:
  ```
  Outputs:
  DevOpsWithAIStack.CloudFrontURL = https://d1234abcd.cloudfront.net
  ```

---

## 🚀 Method 2: Deploy with 1-Click Shell Script

If you prefer a direct shell script without running CDK:

```bash
./aws/deploy.sh
```

---

## 🛠️ Method 3: Deploy with Terraform

If you prefer Terraform:

```bash
npm run build
cd aws/terraform
terraform init
terraform apply -var="bucket_name=devopswithai-static-$(aws sts get-caller-identity --query Account --output text)"
aws s3 sync ../../dist s3://YOUR_BUCKET_NAME/
```

---

## 🔗 Custom Domain Setup (`devopswithai.in`)

To connect `devopswithai.in` to your AWS CloudFront distribution:

1. **In your DNS Provider (GoDaddy, Namecheap, Cloudflare, etc.)**:
   - Add a **CNAME** or **ALIAS** record:
     - **Name / Host**: `@` (or `www`)
     - **Type**: `CNAME` (or `ALIAS` / `ANAME`)
     - **Value / Target**: `dXXXXXXXXXX.cloudfront.net` (Your CloudFront domain output from CDK)

2. **For Free SSL on `devopswithai.in`**:
   - In [AWS Certificate Manager (ACM)](https://console.aws.amazon.com/acm) in **`us-east-1`**, request a free public certificate for `devopswithai.in` and `*.devopswithai.in`.
   - Validate via DNS (add the CNAME record ACM provides).
   - In CloudFront Distribution settings, select your ACM certificate and add `devopswithai.in` under Alternate Domain Names (CNAMEs).
