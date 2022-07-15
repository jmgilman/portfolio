terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.22.0"
    }
  }
}

provider "aws" {
}

data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

## Website ##

resource "aws_s3_bucket" "website" {
  bucket = "glab-portfolio-website"
}

resource "aws_s3_bucket_acl" "example_bucket_acl" {
  bucket = aws_s3_bucket.website.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

## Codebuild ##

# Codebuild Policy
resource "aws_iam_policy" "codebuild-policy" {
  name        = "PortfolioCodebuildPolicy"
  description = "Policy for controlling codebuild permissions"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:*"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "codestar-connections:UseConnection"
        Effect   = "Allow"
        Resource = aws_codestarconnections_connection.github.arn
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      },
      {
        Action   = "ssm:GetParameters"
        Effect   = "Allow"
        Resource = "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/portfolio/cachix-key"
      }
    ]
  })
}

# Codebuild  Role
resource "aws_iam_role" "codebuild" {
  name = "codebuild"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      }
    ]
  })
  managed_policy_arns = [
    aws_iam_policy.codebuild-policy.arn
  ]
}

resource "aws_codebuild_project" "codebuild" {
  name         = "portfolio"
  service_role = aws_iam_role.codebuild.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "jmgilman/nix-aws-codebuild"
    type         = "LINUX_CONTAINER"
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = file("buildspec.yml")
  }
}

## Codepipeline ##

# Codestar Connection
# Note that this resource is in PENDING state until handshake is manually done
# https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-update.html
resource "aws_codestarconnections_connection" "github" {
  name          = "github"
  provider_type = "GitHub"
}

# Codepipeline Policy
resource "aws_iam_policy" "codepipeline-policy" {
  name        = "PortfolioCodepipelinePolicy"
  description = "Policy for controlling codepipeline permissions"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:*"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "codestar-connections:UseConnection"
        Effect   = "Allow"
        Resource = aws_codestarconnections_connection.github.arn
      },
      {
        Effect = "Allow",
        Action = [
          "codebuild:BatchGetBuilds",
          "codebuild:StartBuild"
        ],
        Resource = "*"
      }
    ]
  })
}

# Codepipeline  Role
resource "aws_iam_role" "codepipeline" {
  name = "codepipeline"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "codepipeline.amazonaws.com"
        }
      }
    ]
  })
  managed_policy_arns = [
    aws_iam_policy.codepipeline-policy.arn
  ]
}

# Codepipline S3 Bucket
resource "aws_s3_bucket" "codepipeline" {
  bucket = "glab-portfolio-artifact-store"
}

resource "aws_s3_bucket_acl" "codepipeline-acl" {
  bucket = aws_s3_bucket.codepipeline.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "codepipeline-versioning" {
  bucket = aws_s3_bucket.codepipeline.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Codepipeline
resource "aws_codepipeline" "pipeline" {
  name     = "portfolio-codepipeline"
  role_arn = aws_iam_role.codepipeline.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline.bucket
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name     = "Source"
      category = "Source"
      owner    = "AWS"
      provider = "CodeStarSourceConnection"
      version  = "1"

      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn        = aws_codestarconnections_connection.github.arn
        FullRepositoryId     = "jmgilman/portfolio"
        BranchName           = "master"
        OutputArtifactFormat = "CODEBUILD_CLONE_REF"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]

      configuration = {
        ProjectName = "portfolio"
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "S3"
      version         = "1"
      input_artifacts = ["build_output"]

      configuration = {
        BucketName = aws_s3_bucket.website.bucket
        Extract    = true
      }
    }
  }
}
