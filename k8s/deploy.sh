#!/bin/bash
set -e

# Configuration
PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"
REPO_NAME="devops-repo"
IMAGE_NAME="ai-devops-consulting"
CLUSTER_NAME="devops-cluster-v2"

echo "Deploying to project: $PROJECT_ID"

echo "1. Enabling required APIs..."
gcloud services enable artifactregistry.googleapis.com
gcloud services enable container.googleapis.com

echo "2. Setting up Artifact Registry..."
# Check if repo exists, create if not
if ! gcloud artifacts repositories describe $REPO_NAME --location=$REGION >/dev/null 2>&1; then
    gcloud artifacts repositories create $REPO_NAME \
        --repository-format=docker \
        --location=$REGION \
        --description="Docker repository for DevOpsWithAI"
fi

echo "3. Configuring Docker auth..."
gcloud auth configure-docker $REGION-docker.pkg.dev --quiet

echo "4. Building and Pushing Docker Image..."
IMAGE_URI="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:latest"
docker build -t $IMAGE_NAME:latest ..
docker tag $IMAGE_NAME:latest $IMAGE_URI
docker push $IMAGE_URI

echo "5. Kubernetes manifests are stored separately in the k8s/ directory."

echo "6. Creating GKE Cluster (e2-micro)..."
# Check if cluster exists, create if not
if ! gcloud container clusters describe $CLUSTER_NAME --region=$REGION >/dev/null 2>&1; then
    # Using e2-micro as requested for the lightest machine
    gcloud container clusters create $CLUSTER_NAME \
        --region $REGION \
        --machine-type e2-micro \
        --num-nodes 1 \
        --disk-size 20GB
fi

echo "7. Getting Cluster Credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION

echo "8. Deploying to GKE..."
# Substitute the placeholder with the actual pushed image URL
# NOTE: Since deploy.sh is now inside k8s/, we don't need the k8s/ prefix for the yaml files.
sed "s|IMAGE_URL_PLACEHOLDER|$IMAGE_URI|g" deployment.yaml | kubectl apply -f -
kubectl apply -f service.yaml

echo "9. Setting up HTTPS (Managed Certificate) for devopswithai.in..."
# Reserve a static IP (only runs once)
gcloud compute addresses create devopswithai-ip --global || echo "IP already reserved"

# Apply the Managed Certificate and Ingress
kubectl apply -f managed-cert.yaml
kubectl apply -f ingress.yaml

echo "Deployment complete! Fetching your Global IP Address..."
gcloud compute addresses describe devopswithai-ip --global --format="value(address)"
echo "IMPORTANT: Create an A Record in your DNS provider for devopswithai.in pointing to the IP address above!"

echo "Deployment complete! Waiting for External IP..."
kubectl get service devopswithai-service --watch
