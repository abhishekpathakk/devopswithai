# DevOpsWithAI

A React website for Abhishek Pathak’s DevOps and AI consultancy, with a separate search and enrollment API and deployment examples for Google Cloud and AWS.

## What’s in this repository

- **Web app:** React 19, Vite, React Router, and Framer Motion. Pages include Home, About, Industrial Training, and service detail routes.
- **Search and enrollment API:** Express service in `backend-search/`. Search uses Fuse.js; enrollment writes to BigQuery and Cloud Spanner.
- **Deployment assets:** Docker and Kubernetes/GKE configuration under `k8s/`, plus AWS deployment examples under `aws/`.

## Run the website locally

Requires Node.js 22 or a compatible version supported by the locked Vite toolchain.

```sh
npm ci
npm run dev
```

Vite prints the local URL. To make a production build and preview it locally:

```sh
npm run build
npm run preview
```

Available checks:

```sh
npm run lint
npm run build
```

The GitHub Actions workflow runs both lint and build checks as required steps.

## Search API

The API is a separate Node.js service; install its dependencies from its own directory:

```sh
cd backend-search
npm ci
npm start
```

It listens on port 3000 by default (override with `PORT`). Routes include `GET /api/health`, `GET /api/search?q=...`, and `POST /api/enroll`. Enrollment requires Google Cloud credentials and access to the BigQuery dataset/table and Spanner instance/database referenced in `server.js`.

## Deployment

- **GKE:** The Dockerfile at the repository root builds and serves the frontend. Kubernetes manifests and deployment guidance are under `k8s/`; the GitHub Actions workflow describes the GKE image build and deploy path.
- **AWS:** See [aws/README.md](aws/README.md) for the separate S3/CDK and shell-script deployment options. Review the selected stack’s access, domain, and deletion settings before using it for production.

The AWS and GKE configurations are separate examples and have different prerequisites. Follow the guide for the environment you intend to deploy.

## Project status

This repository currently provides lint and production-build scripts. It does not define an automated application test suite yet.
