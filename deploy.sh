#!/bin/bash

# Build Docker image
echo "Building Docker image..."
docker build -t educhain:latest .

# Create namespace (optional)
kubectl create namespace educhain --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes configurations
echo "Applying Kubernetes configurations..."
kubectl apply -f k8s/configmap.yaml -n educhain
kubectl apply -f k8s/secret.yaml -n educhain
kubectl apply -f k8s/deployment.yaml -n educhain
kubectl apply -f k8s/service.yaml -n educhain

# Optional: Apply ingress if you have an ingress controller
# kubectl apply -f k8s/ingress.yaml -n educhain

echo "Deployment completed!"
echo "Check the status with: kubectl get pods -n educhain"
echo "Get service info with: kubectl get svc -n educhain"