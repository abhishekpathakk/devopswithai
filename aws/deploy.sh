#!/bin/bash
# ==============================================================================
# DevOpsWithAI - AWS S3 + CloudFront Zero-Cost Static Site Deployment
# ==============================================================================
# - Keeps all existing GCP and Kubernetes code 100% untouched.
# - Leverages AWS Free Tier (S3 + CloudFront Global CDN).
# - Configures SPA Routing (404/403 -> index.html 200) for all subpages (/about, etc.)
# ==============================================================================

set -e

# Configuration Defaults
DEFAULT_REGION="us-east-1"
DEFAULT_BUCKET_NAME="devopswithai-static-site-$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "app")"
DOMAIN_NAME="devopswithai.in"

# Colors for terminal output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}   DevOpsWithAI - Simple & Free AWS Static Hosting    ${NC}"
echo -e "${CYAN}======================================================${NC}"

# Check prerequisites
command -v aws >/dev/null 2>&1 || { echo -e "${RED}Error: AWS CLI is not installed.${NC}" >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}Error: npm is not installed.${NC}" >&2; exit 1; }

# Verify AWS credentials
echo -e "\n${YELLOW}1. Checking AWS Account Credentials...${NC}"
CALLER_IDENTITY=$(aws sts get-caller-identity 2>&1)
if [ $? -ne 0 ]; then
    echo -e "${RED}AWS CLI credentials not configured or session expired!${NC}"
    echo "Please run 'aws configure' first."
    exit 1
fi
ACCOUNT_ID=$(echo "$CALLER_IDENTITY" | grep -o '"Account": "[^"]*' | cut -d'"' -f4)
echo -e "${GREEN}✓ Connected to AWS Account ID: ${ACCOUNT_ID}${NC}"

# Set region
REGION="${AWS_REGION:-$DEFAULT_REGION}"
BUCKET_NAME="${S3_BUCKET_NAME:-$DEFAULT_BUCKET_NAME}"

echo -e "\n${YELLOW}Target S3 Bucket:${NC} ${CYAN}${BUCKET_NAME}${NC}"
echo -e "${YELLOW}AWS Region:${NC} ${CYAN}${REGION}${NC}"

# 2. Build Frontend (Vite)
echo -e "\n${YELLOW}2. Building Frontend Production Bundle...${NC}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"
npm run build

if [ ! -d "$REPO_ROOT/dist" ]; then
    echo -e "${RED}Error: Build failed! dist/ directory not found.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Production build ready in dist/${NC}"

# 3. Create S3 Bucket if it doesn't exist
echo -e "\n${YELLOW}3. Verifying S3 Bucket...${NC}"
if ! aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "Creating S3 bucket: $BUCKET_NAME in $REGION..."
    if [ "$REGION" = "us-east-1" ]; then
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
    else
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
            --create-bucket-configuration LocationConstraint="$REGION"
    fi
    echo -e "${GREEN}✓ S3 Bucket created.${NC}"
else
    echo -e "${GREEN}✓ S3 Bucket already exists.${NC}"
fi

# Enable S3 Static Website Hosting (Error document: index.html for SPA sub-pages)
echo -e "\n${YELLOW}4. Configuring S3 Static Website Hosting & SPA Routing...${NC}"
aws s3api put-bucket-website --bucket "$BUCKET_NAME" --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
}'

# 4. Sync Files to S3
echo -e "\n${YELLOW}5. Syncing dist/ assets to S3 with cache optimizations...${NC}"
# Upload assets with 1 year cache
aws s3 sync "$REPO_ROOT/dist/assets" "s3://$BUCKET_NAME/assets" \
    --cache-control "public, max-age=31536000, immutable" \
    --delete

# Upload HTML and other root files with no-cache so updates reflect immediately
aws s3 sync "$REPO_ROOT/dist" "s3://$BUCKET_NAME" \
    --exclude "assets/*" \
    --cache-control "public, max-age=0, must-revalidate" \
    --delete
echo -e "${GREEN}✓ Files uploaded to S3 successfully.${NC}"

# 5. CloudFront Distribution Check / Creation
echo -e "\n${YELLOW}6. Checking CloudFront Distribution...${NC}"

# Search if a distribution already exists for this S3 bucket
EXISTING_DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Origins.Items[?DomainName=='${BUCKET_NAME}.s3.amazonaws.com' || DomainName=='${BUCKET_NAME}.s3.${REGION}.amazonaws.com' || DomainName=='${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com' || DomainName=='${BUCKET_NAME}.s3-website.us-east-1.amazonaws.com']].Id | [0]" --output text 2>/dev/null || echo "None")

if [ "$EXISTING_DIST_ID" != "None" ] && [ -n "$EXISTING_DIST_ID" ] && [ "$EXISTING_DIST_ID" != "null" ]; then
    DISTRIBUTION_ID="$EXISTING_DIST_ID"
    echo -e "${GREEN}✓ Found existing CloudFront Distribution: ${DISTRIBUTION_ID}${NC}"
    CF_DOMAIN=$(aws cloudfront get-distribution --id "$DISTRIBUTION_ID" --query "Distribution.DomainName" --output text)
else
    echo "Creating a new CloudFront distribution with SPA custom error handling..."
    CALLER_REF="deploy-$(date +%s)"
    
    # CloudFront distribution config JSON with SPA custom error response (404 & 403 -> index.html 200)
    CF_CONFIG=$(cat <<EOF
{
  "CallerReference": "${CALLER_REF}",
  "Comment": "DevOpsWithAI Static Site Distribution",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-${BUCKET_NAME}",
        "DomainName": "${BUCKET_NAME}.s3.${REGION}.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-${BUCKET_NAME}",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      },
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF
)

    CREATE_RES=$(aws cloudfront create-distribution --distribution-config "$CF_CONFIG" --output json)
    DISTRIBUTION_ID=$(echo "$CREATE_RES" | grep -o '"Id": "[^"]*' | head -1 | cut -d'"' -f4)
    CF_DOMAIN=$(echo "$CREATE_RES" | grep -o '"DomainName": "[^"]*' | head -1 | cut -d'"' -f4)
    echo -e "${GREEN}✓ CloudFront Distribution created: ${DISTRIBUTION_ID}${NC}"
fi

# Invalidate CloudFront cache
echo -e "\n${YELLOW}7. Invalidating CloudFront Cache (Immediate Propagation)...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" --query "Invalidation.Id" --output text 2>/dev/null || echo "skipped")
echo -e "${GREEN}✓ CloudFront Cache Invalidation triggered: ${INVALIDATION_ID}${NC}"

# Output results
echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}            DEPLOYMENT SUCCESSFUL! 🎉                ${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "Your website is live at:"
echo -e "${CYAN}https://${CF_DOMAIN}${NC}\n"

echo -e "${YELLOW}Sub-pages configured with SPA fallback (No 404s):${NC}"
echo -e "- https://${CF_DOMAIN}/about"
echo -e "- https://${CF_DOMAIN}/industrial-training"
echo -e "- https://${CF_DOMAIN}/services/ai\n"

echo -e "${YELLOW}To link your custom domain (${DOMAIN_NAME}):${NC}"
echo -e "1. In GoDaddy / DNS Provider, add a CNAME record:"
echo -e "   Host: ${CYAN}@${NC} (or www) -> Target: ${CYAN}${CF_DOMAIN}${NC}"
echo -e "2. (Optional for SSL on custom domain) In AWS Certificate Manager (ACM) us-east-1,"
echo -e "   request a free certificate for '${DOMAIN_NAME}', and attach it to CloudFront Distribution ${DISTRIBUTION_ID}."
echo -e "======================================================\n"
