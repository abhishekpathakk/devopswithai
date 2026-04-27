# DevOpsWithAI Infrastructure & Deployment Guide

This document outlines the architecture, troubleshooting steps, and deployment workflow for the **Abhishek Pathak | DevOps & AI Consultancy** platform.

---

## 🏗️ Current Architecture

The platform is built using a modern, scalable, and secure cloud-native stack on **Google Cloud Platform (GCP)**.

- **Frontend**: React (Vite) static application with Framer Motion animations.
- **Containerization**: Multi-stage Docker build (Node 22 -> Nginx Alpine).
- **Container Registry**: Google Artifact Registry (Private).
- **Orchestration**: Google Kubernetes Engine (GKE) Standard.
- **Infrastructure**:
  - **Cluster**: `devops-cluster-v2` (Region: `us-central1`).
  - **Compute**: `e2-small` instances (2GB RAM) to ensure stability for GKE system overhead.
  - **Networking**: 
    - **Gateway API**: Modern Kubernetes networking (v2 of Ingress).
    - **Load Balancer**: Global L7 External Managed Load Balancer.
    - **SSL/TLS**: Google-Managed SSL Certificate (Auto-renewing).
    - **Redirects**: Automatic HTTP-to-HTTPS redirection via GKE FrontendConfig.
    - **Static IP**: Global reserved IP (`34.120.200.52`).

---

## 🛠️ Troubleshooting Log (Issues & Solutions)

During the deployment, we encountered and resolved several critical infrastructure challenges:

### 1. IAM Permission Denied
- **Issue**: `gcloud` failed to enable APIs or push images to `test-migration-project`.
- **Solution**: Switched the active project to `demos-490411` where the account had full Owner/Admin permissions.

### 2. GKE Disk Size Requirement
- **Issue**: Attempted to create GKE nodes with 10GB disks, but the OS image required a minimum of 12GB.
- **Solution**: Updated `deploy.sh` to use `--disk-size 20GB`.

### 3. Insufficient Node Memory (`e2-micro` failure)
- **Issue**: `e2-micro` nodes (1GB RAM) were 98% consumed by GKE system processes (kube-proxy, etc.), leaving no room for the web app pod.
- **Solution**: Provisioned a new node pool using `e2-small` (2GB RAM) which provides stable allocatable memory.

### 4. CPU Quota & Scheduling
- **Issue**: Pods failed to schedule even on `e2-small` because the default CPU requests (50m) slightly exceeded the remaining idle CPU on the node.
- **Solution**: Lowered the deployment resource requests to `cpu: 10m` and `memory: 32Mi`.

### 5. Docker Platform Mismatch (Mac M1/M2/M3)
- **Issue**: Building the image on a Mac created an `arm64` binary. GKE nodes run on `amd64`, causing an `ErrImagePull` (No match for platform in manifest).
- **Solution**: Rebuilt the image using `docker build --platform linux/amd64`.

### 6. SSL Certificate "Provisioning" Delay
- **Issue**: Certificate remained in `Provisioning` because only the `@` record was pointed to the IP, but the cert required `www` as well.
- **Solution**: Added the `www` A-record in GoDaddy.

### 7. Google Cloud IP Address Quota
- **Issue**: Hit the default quota of 4 public IP addresses in `us-central1`.
- **Solution**: Deleted the old `e2-micro` node pool to free up IPs for the new `e2-small` nodes and the Global Static IP.

### 8. Gateway API & SSL Compatibility
- **Issue**: `ManagedCertificate` CRD (networking.gke.io/v1) is compatible with Ingress but fails on modern GKE Gateways with "No certificates specified for HTTPS".
- **Solution**: Migrated to **Google Cloud Certificate Manager**. Created a `Certificate`, `CertificateMap`, and `CertificateMapEntry` via `gcloud`, then attached the map to the Gateway.

### 9. Gateway API Static IP Binding
- **Issue**: Gateway API ignored the `networking.gke.io/static-ip` annotation and assigned an ephemeral IP instead.
- **Solution**: Used the native Gateway API `spec.addresses` field with `type: NamedAddress` to explicitly bind the reserved IP name (`devopswithai-ip`).

### 10. Gateway State Sync (Delete/Recreate)
- **Issue**: Updating the Gateway spec to fix the IP address did not trigger an immediate Load Balancer update.
- **Solution**: Performed a `kubectl delete` followed by `kubectl apply` on the Gateway resource to force a clean re-provisioning of the Global Load Balancer.

---

## 🚀 Step-by-Step Deployment Guide

To recreate or update this infrastructure from scratch, follow these steps in order:

### Step 1: Prepare the Domain (GoDaddy)
Reserve your domain (`devopswithai.in`) and prepare to point A records to the Static IP we will generate.

### Step 2: Build & Push the Image
```bash
# Ensure you build for the cloud architecture (amd64), not your local Mac
docker build --platform linux/amd64 -t ai-devops-consulting:latest .
# Push to Artifact Registry
gcloud auth configure-docker us-central1-docker.pkg.dev
docker tag ai-devops-consulting:latest us-central1-docker.pkg.dev/PROJECT_ID/devops-repo/ai-devops-consulting:latest
docker push us-central1-docker.pkg.dev/PROJECT_ID/devops-repo/ai-devops-consulting:latest
```

### Step 3: Provision GKE Cluster
Use `e2-small` machines to avoid resource exhaustion.
```bash
gcloud container clusters create devops-cluster-v2 --region us-central1 --machine-type e2-small --num-nodes 1 --disk-size 20GB --gateway-api=standard
```

### Step 4: Reserve Static IP
```bash
gcloud compute addresses create devopswithai-ip --global
```

### Step 5: Apply Kubernetes Manifests
Apply files in the `k8s/` directory in this specific order:
1. `managed-cert.yaml` (Starts the SSL process)
2. `frontend-config.yaml` (Sets up HTTPS redirect)
3. `deployment.yaml` (Runs the app)
4. `service.yaml` (Exposes the app internally)
5. `gateway-api.yaml` (Creates the Load Balancer and routes traffic)

### Step 6: Finalize DNS
Update GoDaddy A-records for both `@` and `www` to point to the IP returned by:
`gcloud compute addresses describe devopswithai-ip --global --format="value(address)"`
