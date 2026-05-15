# Istio Configuration for DevOpsWithAI

This directory contains production-grade Istio manifests for traffic management, security, and observability.

## Prerequisites
1. Istio must be installed in the cluster (`istioctl install --set profile=demo -y`).
2. Sidecar injection must be enabled: `kubectl label namespace default istio-injection=enabled`.

## Manifests
- `gateway.yaml`: Defines the ingress gateway for `devopswithai.in`.
- `virtual-service.yaml`: Handles routing (frontend to `/`, search-api to `/api`).
- `destination-rules.yaml`: Configures mTLS and version subsets.
- `peer-authentication.yaml`: Enforces strict mTLS for all services.

## How to Apply (Dry Run)
To verify these manifests without applying:
```bash
kubectl apply -f k8s/istio/ --dry-run=client
```

## How to Apply (Production)
```bash
kubectl apply -f k8s/istio/
```
