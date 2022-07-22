output "iam_role_arn" {
  description = "ARN of the IAM role used by CodeBuild"
  value       = aws_iam_role.this.arn
}

output "codebuild_project_arn" {
  description = "ARN of the CodeBuild project"
  value       = aws_codebuild_project.this.arn
}
