---
title: 'Terraform Best Practices for Multi-Cloud Deployments'
excerpt: 'A comprehensive guide to organizing and managing Terraform code across multiple cloud providers.'
tags: ['Terraform', 'Infrastructure as Code', 'DevOps', 'Cloud']
date: 2024-02-20
readTime: '6 min'
featured: true
---

Managing infrastructure across multiple cloud providers can quickly become complex. Here's how I approach Terraform organization for maintainability and scalability.

## Module Structure

A well-organized Terraform repository is crucial. Here's the structure I recommend:

```bash
terraform/
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── compute/
│   └── security/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
└── global/
    └── iam/
```

## State Management

Remote state with locking is **non-negotiable**. Here's how to configure it with S3 and DynamoDB:

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/infrastructure.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

Create the DynamoDB table for locking:

```bash
aws dynamodb create-table \
  --table-name terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

## Testing Infrastructure

Use [Terratest](https://terratest.gruntwork.io/) for automated testing of your modules. Here's a simple example:

```go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestVpcModule(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/networking",
        Vars: map[string]interface{}{
            "vpc_cidr": "10.0.0.0/16",
            "environment": "test",
        },
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcId)
}
```

## Key Principles

1. **DRY (Don't Repeat Yourself)**: Use modules for reusable components
2. **Immutable Infrastructure**: Prefer replacement over modification
3. **Version Pinning**: Always pin provider and module versions

```hcl
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```

For more on Terraform best practices, check out the [official documentation](https://developer.hashicorp.com/terraform/language).
