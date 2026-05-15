# DevOpsWithAI Project Context Summary

This document serves as a persistent context for AI coding assistants to quickly understand the current state of the infrastructure and frontend.

## 🚀 1. Infrastructure & Cloud (GKE)
- **Architecture**: Migrated from **Regional Cluster** (3 zones) to a **Zonal Node Pool** configuration for cost efficiency.
- **Node Count**: Reduced total nodes to **2** (1 Standard, 1 Spot).
- **Optimization**: Autoscaling disabled for cost control; Daily burn rate reduced by ~70%.
- **Service Mesh**: **Istio CRDs** are installed. Production-grade manifests (Gateway, VirtualService, mTLS) are stored in `k8s/istio/`.

## 🎨 2. Frontend Modernization
- **Theme**: Hard-coded **Premium Dark Mode**. Light mode toggle removed.
- **Vibrancy**: Neural background particles updated to **Electric Cyan** with glow effects.
- **About Us**: New SEO-optimized page at `/about` featuring founder Abhishek Pathak.
- **Mobile Friendly**: Implemented **Hamburger Menu** and responsive grid layouts (Stacked on mobile).
- **Animations**: Pipeline animation fixed (Full "Build-to-Deploy" flow visible without clipping).

## 🛠️ 3. CI/CD & Deployment
- **Docker**: Latest frontend image is **`v9`** (`abhishekpathak1111/devopswithai-frontend:v9`).
- **Build Process**: Vite build is integrated into Docker multi-stage build.
- **Deployment**: Managed via `kubectl` with rolling updates.

## 📂 4. Key Files & Folders
- `/src/pages/About.jsx`: Founder's profile and company vision.
- `/k8s/istio/`: Future-ready Istio configurations.
- `/src/index.css`: Centralized design system and responsive media queries.
- `/backend-search/`: API for search functionality (running on Spot VMs).

## 📌 Next Steps
- Implement **Workload Identity** for more secure IAM access.
- Migrate manual `gcloud/kubectl` configs to **Terraform**.
- Monitor GKE credits for the next 24-48 hours to verify cost reduction.

---
*Last Updated: 2026-05-15 by Antigravity AI*
