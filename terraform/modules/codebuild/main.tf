resource "aws_iam_policy" "this" {
  name        = "codebuild-${var.project_name}-policy"
  description = "Permissions for ${var.project_name} CodeBuild project"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat([
      # Allow fetching/pushing objects to artifact store
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
          "${var.artifact_store_arn}/*"
        ]
      },
      # Allow access to Codestar connection for pulling source
      {
        Action   = "codestar-connections:UseConnection"
        Effect   = "Allow"
        Resource = var.codestar_arn
      },
      # Allow pushing build logs
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      },
      ],
    var.extra_policies)
  })
}

resource "aws_iam_role" "this" {
  name = "codebuild-${var.project_name}"
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
    aws_iam_policy.this.arn
  ]
}

resource "aws_codebuild_project" "this" {
  name         = var.project_name
  service_role = aws_iam_role.this.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  cache {
    location = var.artifact_store_name
    type     = "S3"
  }

  environment {
    compute_type = var.build_compute_type
    image        = var.build_image
    type         = "LINUX_CONTAINER"
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = file(var.buildspec_file)
  }
}
