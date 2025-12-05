---
title: 'Running Kubernetes at Scale: Lessons from Project Catalyst'
excerpt: 'Key insights and patterns learned while building infrastructure for a decentralized platform with 400K+ users.'
tags: ['Kubernetes', 'DevOps', 'Web3', 'Infrastructure']
date: 2024-01-15
readTime: '8 min'
featured: true
---

When I joined Input Output Global to work on Project Catalyst, I knew we'd be facing some unique challenges. Building infrastructure for a decentralized governance platform isn't quite like your typical web application deployment.

## The Challenge

Project Catalyst serves as Cardano's innovation fund, distributing over **$50M annually** across 4 funding rounds. The platform needs to handle:

- 400K+ community members participating in governance
- Real-time voting and proposal submission
- Integration with blockchain infrastructure
- High availability during critical voting periods

## Architecture Decisions

We chose a GitOps approach using [Argo CD](https://argo-cd.readthedocs.io/), allowing us to:

1. **Version Control Everything**: All infrastructure changes go through PR review
2. **Automated Rollbacks**: Failed deployments automatically revert
3. **Audit Trail**: Complete history of all changes

Here's a simplified example of our Argo CD application manifest:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: catalyst-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/input-output-hk/catalyst
    targetRevision: main
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: catalyst
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Key Learnings

### 1. Observability First

Before scaling, ensure you have comprehensive monitoring. We implemented a full observability stack:

```bash
# Deploy Prometheus stack
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.enabled=true

# Check deployment status
kubectl get pods -n monitoring
```

### 2. Cost Optimization

Running at scale doesn't mean burning money. Through careful resource management and spot instances, we reduced infrastructure costs by **$250K annually**.

Key strategies included:

- Using `requests` and `limits` appropriately
- Implementing the [Cluster Autoscaler](https://github.com/kubernetes/autoscaler)
- Leveraging spot/preemptible instances for non-critical workloads

### 3. Documentation as Code

Training 20+ engineers required more than just wikis. We treated documentation like code—versioned, reviewed, and continuously updated.

## Conclusion

Building reliable infrastructure for Web3 requires the same fundamentals as any other domain: observability, automation, and a strong DevOps culture. The technology may be cutting-edge, but the principles remain timeless.
