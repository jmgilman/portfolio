resource "aws_iam_policy" "this" {
  name        = "codepipeline-${var.project_name}-policy"
  description = "Permissions for ${var.project_name} CodePipeline"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:GetBucketVersioning",
          "s3:PutObject",
          "s3:PutObjectAcl"
        ]
        Effect = "Allow"
        Resource = [
          var.artifact_store_arn,
          "${var.artifact_store_arn}/*",
          var.website_bucket_arn,
          "${var.website_bucket_arn}/*",
        ]
      },
      {
        Action   = "codestar-connections:UseConnection"
        Effect   = "Allow"
        Resource = var.codestar_arn
      },
      {
        Effect = "Allow",
        Action = [
          "codebuild:BatchGetBuilds",
          "codebuild:StartBuild"
        ],
        Resource = var.codebuild_project_arn
      }
    ]
  })
}

# Codepipeline  Role
resource "aws_iam_role" "this" {
  name = "codepipeline-${var.project_name}"
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
    aws_iam_policy.this.arn
  ]
}

# Codepipeline
resource "aws_codepipeline" "pipeline" {
  name     = var.project_name
  role_arn = aws_iam_role.this.arn

  artifact_store {
    location = var.artifact_store_name
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
        ConnectionArn        = var.codestar_arn
        FullRepositoryId     = var.project_repo
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
        ProjectName = var.project_name
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
        BucketName = var.website_bucket_name
        Extract    = true
        CannedACL  = "public-read"
      }
    }
  }
}
