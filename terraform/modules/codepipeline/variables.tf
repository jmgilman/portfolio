variable "project_name" {
  description = "Name of the CodeBuild project to create"
  type        = string
}

variable "project_repo" {
  description = "Name of the Github project repository"
  type        = string
}

variable "artifact_store_arn" {
  description = "ARN of the artifact store S3 bucket"
  type        = string
}

variable "artifact_store_name" {
  description = "Name of the artifact store S3 bucket"
  type        = string
}

variable "website_bucket_arn" {
  description = "ARN of the website S3 bucket"
  type        = string
}

variable "website_bucket_name" {
  description = "Name of the website S3 bucket"
  type        = string
}

variable "codestar_arn" {
  description = "ARN of the Codestar connection to use"
  type        = string
}

variable "codebuild_project_arn" {
  description = "ARN of the CodeBuild project"
  type        = string
}
